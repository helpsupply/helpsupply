import React from "react";
import * as tools from "../functions";
import hospital_index from "../data/hospital_index";

class EntryPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {}

  componentDidMount() {
    var searchTimer = null;
    document
      .getElementById("searchterm")
      .addEventListener("keyup", function(event) {
        if (searchTimer) {
          clearTimeout(searchTimer);
        }
        searchTimer = window.setTimeout(tools.updateSearch, 300);
      });
  }

  render() {
    console.log(hospital_index);
    return (
      <div className="entryportal container-sm">
        <h3 className="logored">hospital.community</h3>
        <h2>Supporting our heroes on the front lines of COVID-19</h2>
        <p>
          Hospitals and the people who staff them need our help with{" "}
          <b>supplies, childcare and moral support</b>. Search below to find
          your local hospital and find out how to seek or provide help.
        </p>
        <form>
          <div className="form-group">
            <label for="searchterm" style={{ fontWeight: "bold" }}>
              Enter your City or Hospital Name
            </label>
            <input
              className="form-control"
              id="searchterm"
              placeholder="i.e. New York or Zuckerberg"
            />
          </div>
          <ul id="searchresults" className="list-group"></ul>
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
