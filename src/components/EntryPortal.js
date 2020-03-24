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
      facilities: [],
      selectedResults: "",
      stage: 0,
      supplyOrDemand: ""
    };
    this.handleChangeDonate = this.handleChangeDonate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectHospital = this.handleSelectHospital.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleNextStage = this.handleNextStage.bind(this);
    this.handlePrevStage = this.handlePrevStage.bind(this);
  }

  // NEED SUPPLIES SEARCH BOX HANDLER

  handleNextStage(supplyOrDemand) {
    if (supplyOrDemand === "demand") {
      this.setState(prevState => {
        return { stage: prevState.stage + 1, supplyOrDemand: "demand" };
      });
    } else {
      this.setState(prevState => {
        return { stage: prevState.stage + 1, supplyOrDemand: "supply" };
      });
    }
  }

  handlePrevStage(supplyOrDemand) {
    this.setState(prevState => {
      return { stage: prevState.stage - 1 };
    });
  }

  handleChange(event) {
    this.setState({ userInput: event.target.value });
    if (event.target.value.length > 1) {
      let term = event.target.value.toUpperCase();
      const searchResults = tools.updateSearch(hospital_index.index, term);
      this.setState({ results: searchResults });
    } else {
      this.setState({
        results: [],
        selectedResult: ""
      });
    }
  }

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
    if (event.key === "Enter") {
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
    if (this.state.selectedResult !== "") {
      this.handleRedirect();
    }
  }

  handleRedirect() {
    if (this.state.selectedResult !== "") {
      if (this.props.backend.authLoaded && this.props.backend.isLoggedIn()) {
        this.props.backend
          .dropSiteExists(this.state.selectedResult)
          .then(exists => {
            if (exists) {
              let url = "/dropsite/" + this.state.selectedResult + "/admin";
              this.props.history.push(url);
            } else {
              let url = "/dropsite/new/admin/" + this.state.selectedResult;
              this.props.history.push(url);
            }
          });
      } else {
        let url = "/signup/" + this.state.selectedResult;
        this.props.history.push(url);
      }
    }
  }

  doNothing(event) {
    event.preventDefault();
  }

  componentDidUpdate() {}

  componentDidMount() {
    this.props.backend.listDropSites().then(data => {
      this.setState({ facilities: data });
    });
  }

  // DONATE SUPPLIES DROPDOWN HANDLER
  handleChangeDonate(event) {
    let url = "/dropsite/" + event.target.value;
    this.props.history.push(url);
  }

  render() {
    return (
      <div>
        {this.state.stage === 0 && (
          <div className="homeBox">
            <h1 className="logoText">help.supply</h1>
            <button
              onClick={() => {
                this.handleNextStage("demand");
              }}
            >
              Need >
            </button>
            <div>Healthcare professionals only</div>
            <button
              onClick={() => {
                this.handleNextStage("supply");
              }}
            >
              Donate >
            </button>
            <div>Open to the public</div>
            <div className="homeIntro">
              We're connecting doctors and nurses who lack supplies for their
              fight against the coronavirus to communicate their needs to the
              people who want to help them.
            </div>
            <div>
              By doing this through a centralized platform, we're also building
              a real-time updating database of global demand at the
              facility-specific level, and making that information freely
              available to the organizations best situated to provide
              large-scale supply.
            </div>
            <Link to={"/"}>Learn more ></Link>
          </div>
        )}

        {this.state.stage === 1 && this.state.supplyOrDemand === "demand" && (
          <div className="homeBox">
            <button onClick={this.handlePrevStage}>Back</button>
            <h1 className="logoText">help.supply</h1>
            <div className="homeBoxesContainer">
              <div className="entryportal container-sm entryPortalFirst">
                <h3 className="logored healthcarePro">
                  Find your healthcare facility
                </h3>
                <form onSubmit={this.handleDoNothing} autoComplete="off">
                  <div className="form-group">
                    <label htmlFor="searchterm">
                      I'm a healthcare professional working at:
                    </label>
                    <input
                      className="form-control"
                      id="searchterm"
                      placeholder="City or healthcare facility"
                      value={this.state.value}
                      onChange={this.handleChange}
                      onKeyDown={this.handleKeyPress}
                      required={true}
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
            </div>
          </div>
        )}

        {this.state.stage === 1 && this.state.supplyOrDemand === "supply" && (
          <div className="homeBox">
            <button onClick={this.handlePrevStage}>Back</button>
            <h1 className="logoText">help.supply</h1>
            <div className="homeBoxesContainer">
              <div className="entryportal container-sm">
                <h3 className="logored logoredSupply">
                  Pick a healthcare facility
                </h3>
                <div className="homeDescription">
                  Use the dropdown menu below to find an active location looking
                  for supplies.
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
                          {facility.dropSiteName} |{" "}
                          {hospital_index.index.id_index[facility.id].name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(EntryPortal);
