import React from "react";
import * as tools from "../functions";
import * as hospital_index from "../data/hospital_index";
import HospitalResult from "./HospitalResult";
import { withRouter, Link } from "react-router-dom";
import { Form } from "react-bootstrap";

class EntryPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      results: [],
      facilities: []
    };
    this.handleChangeDonate = this.handleChangeDonate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectHospital = this.handleSelectHospital.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  // for user input

  handleChangeDonate(event) {
    let url = "/dropsite/" + event.target.value;
    this.props.history.push(url);
  }

  // for user input
  handleChange(event) {
    this.setState({ userInput: event.target.value });
    if (event.target.value.length > 1) {
      let term = event.target.value.toUpperCase();
      const searchResults = tools.updateSearch(hospital_index.index, term);
      this.setState({ results: searchResults });
    } else {
      this.setState({
        results: []
      });
    }
  }

  // for mouse overs and keyboard
  handleKeyPress(event) {
    if (event.key === "ArrowDown") {
      if (this.state.results.length > 0) {
        event.preventDefault();
        var index = this.state.results
          .map(function(e) {
            return e.id;
          })
          .indexOf(this.state.selectedResult);
        if (index < this.state.results.length - 1) {
          this.setState({
            selectedResult: this.state.results[index + 1].id
          });
        }
      }
    }
    if (event.key === "ArrowUp") {
      if (this.state.results.length > 0) {
        event.preventDefault();
        var index = this.state.results
          .map(function(e) {
            return e.id;
          })
          .indexOf(this.state.selectedResult);
        if (index > 0) {
          this.setState({
            selectedResult: this.state.results[index - 1].id
          });
        }
      }
    }
  }

  handleSelectHospital(id) {
    this.setState({ selectedResult: id });
  }

  // for going to hospital page
  handleSubmit(event) {
    // this prevents the page from reloading when form is submitted
    event.preventDefault();
    if (this.state.selectedResult !== "") {
      this.handleRedirect();
    }
  }
  handleRedirect() {
    if (this.state.selectedResult !== "") {
      let url = "/signup/" + this.state.selectedResult;
      this.props.history.push(url);
    }
  }

  componentDidUpdate() {}

  componentDidMount() {
    this.props.backend.listDropSites().then(data => {
      this.setState({ facilities: data });
    });
  }

  render() {
    return (
      <div>
        <div className="entryportal container-sm">
          <h3 className="logored">Need supplies?</h3>
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <div className="form-group">
              <label htmlFor="searchterm" style={{ fontWeight: "bold" }}>
                Enter your City or Hospital Name
              </label>
              <input
                className="form-control"
                id="searchterm"
                placeholder="i.e. New York City or Princess Margaret"
                value={this.state.value}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyPress}
              />
            </div>
            <ul id="searchresults" className="list-group">
              {this.state.results.map(result => {
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
          <h3 className="logored">Donate supplies?</h3>
          <Form.Group
            controlId="exampleForm.ControlSelect1"
            onChange={this.handleChangeDonate}
          >
            <Form.Control as="select">
              <option value="">Pick a healthcare facility</option>
              {this.state.facilities.map((facility, i) => {
                return (
                  <option key={i} value={facility.id}>
                    {facility.dropSiteName} |{" "}
                    {hospital_index.index.id_index[facility.id].name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </div>
      </div>
    );
  }
}

export default withRouter(EntryPortal);
