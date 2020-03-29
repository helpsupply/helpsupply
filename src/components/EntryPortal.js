import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import * as tools from '../functions';
import * as hospital_index from '../data/hospital_index';

import HospitalResult from './HospitalResult';

class EntryPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      results: [],
      facilities: [],
      selectedResults: '',
    };
    this.handleChangeDonate = this.handleChangeDonate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectHospital = this.handleSelectHospital.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  // NEED SUPPLIES SEARCH BOX HANDLER

  handleChange(event) {
    this.setState({ userInput: event.target.value });
    if (event.target.value.length > 1) {
      let term = event.target.value.toUpperCase();
      const searchResults = tools.updateSearch(hospital_index.index, term);
      this.setState({ results: searchResults });
    } else {
      this.setState({
        results: [],
        selectedResult: '',
      });
    }
  }

  handleKeyPress(event) {
    let index;
    if (event.key === 'ArrowDown') {
      if (this.state.results.length > 0) {
        event.preventDefault();
        index = this.state.results
          .map(function (e) {
            return e.id;
          })
          .indexOf(this.state.selectedResult);
        if (index < this.state.results.length - 1) {
          this.setState({
            selectedResult: this.state.results[index + 1].id,
          });
        }
      }
    }
    if (event.key === 'ArrowUp') {
      if (this.state.results.length > 0) {
        event.preventDefault();
        index = this.state.results
          .map(function (e) {
            return e.id;
          })
          .indexOf(this.state.selectedResult);
        if (index > 0) {
          this.setState({
            selectedResult: this.state.results[index - 1].id,
          });
        }
      }
    }
    if (event.key === 'Enter') {
      if (this.state.selectedResult) {
        event.preventDefault();
        this.handleSubmit();
      } else {
        event.preventDefault();
      }
    }
  }

  handleSelectHospital(id) {
    this.setState({ selectedResult: id });
  }

  handleSubmit(event) {
    // this prevents the page from reloading when form is submitted
    if (event) {
      event.preventDefault();
    }
    if (this.state.selectedResult !== '') {
      this.handleRedirect();
    }
  }

  handleRedirect() {
    const { backend, history } = this.props;
    const { selectedResult } = this.state;

    if (selectedResult !== '') {
      if (backend.authLoaded && backend.isLoggedIn()) {
        backend.dropSiteExists(selectedResult).then((exists) => {
          if (exists) {
            history.push(
              routeWithParams(Routes.DROPSITE_ADMIN, { id: selectedResult }),
            );
          } else {
            history.push(
              routeWithParams(Routes.DROPSITE_NEW_ADMIN, {
                dropsite: selectedResult,
              }),
            );
          }
        });
      } else {
        history.push(
          routeWithParams(Routes.SIGNUP_DROPSITE, { dropsite: selectedResult }),
        );
      }
    }
  }

  doNothing(event) {
    event.preventDefault();
  }

  componentDidUpdate() {}

  componentDidMount() {
    this.props.backend.listDropSites().then((data) => {
      this.setState({ facilities: data });
    });
  }

  // DONATE SUPPLIES DROPDOWN HANDLER
  handleChangeDonate(event) {
    this.props.history.push(
      routeWithParams(Routes.DROPSITE_DETAIL, { id: event.target.value }),
    );
  }

  render() {
    return (
      <div className="homeBox">
        <h1 className="logoText">help.supply</h1>
        <div className="homeIntro">
          We connect healthcare workers who desperately need COVID-19 supplies
          with the general public.
        </div>
        <div className="homeBoxesContainer">
          <div className="entryportal container-sm entryPortalFirst">
            <h3 className="logored healthcarePro">
              I'm a healthcare professional who needs supplies
            </h3>
            <form onSubmit={this.handleDoNothing} autoComplete="off">
              <div className="form-group">
                <label htmlFor="searchterm">
                  Start by entering your <b>City</b> or <b>Hospital Name</b>
                </label>
                <input
                  className="form-control"
                  id="searchterm"
                  placeholder="e.g. New York City or Princess Margaret"
                  value={this.state.value}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyPress}
                  required={true}
                />
              </div>
              <ul id="searchresults" className="list-group">
                {this.state.results.map((result) => {
                  let selected = this.state.selectedResult === result.id;
                  return (
                    <HospitalResult
                      key={result.id}
                      hospital={result.hospital}
                      id={result.id}
                      selectedResult={selected}
                      handleSelectHospital={this.handleSelectHospital}
                      handleRedirect={this.handleRedirect}
                    />
                  );
                })}
              </ul>
            </form>
          </div>
          <div className="entryportal container-sm">
            <h3 className="logored logoredSupply">I want to donate supplies</h3>
            <div className="homeDescription">
              Use the dropdown menu below to find an active location looking for
              supplies.
            </div>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              onChange={this.handleChangeDonate}
            >
              <Form.Control as="select">
                <option value="">Pick a healthcare facility</option>
                {this.state.facilities.map((facility, i) => {
                  return (
                    <option key={i} value={facility.id}>
                      {facility.dropSiteName} |{' '}
                      {hospital_index.index.id_index[facility.id].name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EntryPortal);
