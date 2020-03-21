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
      facilities: []
    };
    this.handleChangeAdmin = this.handleChangeAdmin.bind(this);
    this.handleChangeDonate = this.handleChangeDonate.bind(this);
  }

  // for user input
  handleChangeAdmin(event) {
    let url = "/signup/" + event.target.value;
    this.props.history.push(url);
  }

  handleChangeDonate(event) {
    let url = "/dropsite/" + event.target.value;
    this.props.history.push(url);
  }

  componentDidUpdate() {}

  componentDidMount() {
    this.props.backend.listDropSites().then(data => {
      this.setState({ facilities: data });
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <div className="entryportal container-sm">
          <h3 className="logored">Need supplies?</h3>
          <Form.Group
            controlId="exampleForm.ControlSelect1"
            onChange={this.handleChangeAdmin}
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
          <Link to="/signup/new">Add new facility</Link>
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
