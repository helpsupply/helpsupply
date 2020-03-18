import React from "react";
import * as tools from "../functions";
import * as hospital_index from "../data/hospital_index";

class EntryPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      results: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ userInput: event.target.value });
    if (event.target.value.length > 1) {
      let term = event.target.value.toUpperCase();
      const searchResults = tools.updateSearch(hospital_index.index, term);
      this.setState({ results: searchResults });
    }
  }

  handleSubmit(event) {
    // this prevents the page from reloading when form is submitted
    event.preventDefault();
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
        <form onSubmit={this.handleSubmit}>
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
            />
          </div>
          <ul id="searchresults" className="list-group">
            {this.state.results.map(result => (
              <li key={result.id} className="list-group-item result">
                <b>{result.hospital.name}</b> in {result.hospital.city}
              </li>
            ))}
          </ul>
        </form>
        <center>
          <span className="logored">hospital.community</span> is a volunteer
          project put together by a global team of volunteers.
        </center>
      </div>
    );
  }
}

export default EntryPortal;
