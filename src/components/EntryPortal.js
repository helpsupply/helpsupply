import React from "react";
import * as tools from "../functions";
import * as hospital_index from "../data/hospital_index";
import HospitalResult from "./HospitalResult";
import { withRouter } from "react-router-dom";

class EntryPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      results: [],
      selectedResult: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectHospital = this.handleSelectHospital.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  // for user input
  handleChange(event) {
    this.setState({ userInput: event.target.value });
    if (event.target.value.length > 1) {
      let term = event.target.value.toUpperCase();
      const searchResults = tools.updateSearch(hospital_index.index, term);
      this.setState({ results: searchResults });
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
      let url = "/hospital/" + this.state.selectedResult;
      this.props.history.push(url);
    }
  }

  componentDidUpdate() {}

  componentDidMount() {}

  render() {
    return (
      <div className="entryportal container-sm">
        <h3 className="logored">hospital.community</h3>
        <h2>Supporting our heroes on the front lines of COVID-19</h2>
        <p>
          Hospitals and the people who staff them need our help with{" "}
          <b>supplies, childcare and moral support</b>. Search below to find
          your local hospital and find out how to seek or provide help.
        </p>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="searchterm" style={{ fontWeight: "bold" }}>
              Enter your City or Hospital Name
            </label>
            <input
              className="form-control"
              id="searchterm"
              placeholder="i.e. New York or Zuckerberg"
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
        <center>
          <span className="logored">hospital.community</span> is a volunteer
          project put together by a global team of <a className="logored" href="https://github.com/newhouseb/hospitalcommunity/">volunteers</a>.
        </center>
      </div>
    );
  }
}

export default withRouter(EntryPortal);
