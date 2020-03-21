import React from "react";
import * as hospital_index from "../data/hospital_index";
import * as needTypes from "../data/needTypes";
import { withRouter } from "react-router-dom";
import LinksResult from "./LinksResult";
import DropSiteNeedGroup from "./DropSiteNeedGroup";
import NewRequestForm from "./NewRequestForm";
import EditDropSiteForm from "./EditDropSiteForm";
import StaffNeedTable from "./StaffNeedTable";
import Axios from "axios";

class DropSiteAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropSiteId: "",
      dropSiteName: "",
      dropSiteAddress: "",
      dropSiteZip: "",
      dropSiteDescription: "",
      needs: []
    };
    this.handleLinkSubmitChange = this.handleLinkSubmitChange.bind(this);
    this.handleLinkSubmitTextChange = this.handleLinkSubmitTextChange.bind(
      this
    );

    this.handleLinkSubmit = this.handleLinkSubmit.bind(this);
    this.handleRemoveRequest = this.handleRemoveRequest.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.handleEditDropSite = this.handleEditDropSite.bind(this);
  }

  handleLinkSubmitChange(event) {
    this.setState({ linkSubmitValue: event.target.value });
  }

  handleLinkSubmitTextChange(event) {
    this.setState({ linkSubmitTextValue: event.target.value });
  }

  handleLinkSubmit(event) {
    event.preventDefault();
    if (
      this.state.linkSubmitValue !== "" &&
      this.state.linkSubmitTextValue !== ""
    ) {
      console.log("Submitting..." + this.state.linkSubmitValue);
      this.writeUserData("documents", {
        kind: "link",
        location_id: "330101",
        text: this.state.linkSubmitTextValue,
        url: this.state.linkSubmitValue,
        published: false
      });
    } else {
      this.setState({
        error: "You're missing a required field."
      });
    }
  }

  handleChange(event) {}

  handleSubmit(event) {}

  handleNewRequest(requestObj) {
    let oldList = this.state.needs;
    console.log(oldList);
    oldList.push(requestObj);
    console.log(oldList);
    this.setState({
      needs: oldList
    });
  }

  handleEditDropSite() {}

  componentDidUpdate(prevProps, prevState) {
    console.log("component updated");
  }

  handleRemoveRequest(requestId) {
    let oldList = this.state.needs;
    let newList = oldList.filter(function(obj) {
      return obj.id !== requestId;
    });
    this.setState({
      needs: newList
    });
  }

  componentDidMount() {
    this.props.backend.getRequests(this.props.match.params.id).then(data => {
      this.setState(
        {
          needs: data
        },
        () => {
          console.log(this.state);
        }
      );
    });
    this.props.backend.getDropSites(this.props.match.params.id).then(data => {
      this.setState(
        {
          dropSiteId: data.location_id,
          dropSiteName: data.dropSiteName,
          dropSiteAddress: data.dropSiteAddress,
          dropSiteZip: data.dropSiteZip,
          dropSiteDescription: data.dropSiteDescription
        },
        () => {
          console.log(this.state);
        }
      );
    });
  }

  componentDidUpdate() {}

  render() {
    let hospital = hospital_index.index.id_index[this.props.match.params.id];
    let hospitalText = "";
    if (typeof hospital === "undefined") {
      hospitalText = "";
    } else {
      hospitalText = (
        <div className="servingText">(serving {hospital.name})</div>
      );
    }

    return (
      <div className="">
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1" id="hospitalname">
            <div className="dropSiteIdText">
              <b>Dropsite: {this.state.dropSiteId}</b>
            </div>{" "}
            {hospitalText}
          </span>
          <a href="#" className="navbar-brand mb-0 h1 logored">
            hospital.community
          </a>
        </nav>
        <div className="content">
          <div className="panelFull">
            <div className="hospitalNeedsTopBar">
              <div className="hospitalNeedsLeft">
                <div className="dropSiteTitle">
                  <h3 className="mb-3 dropSiteName">
                    {this.state.dropSiteName}
                  </h3>
                  <span className="servingText">
                    Dropsite: {this.state.dropSiteId}
                  </span>
                </div>
                <div className="dropSiteDescription">
                  <p>{this.state.dropSiteDescription}</p>
                </div>
              </div>
              <div className="hospitalNeedNewSubmit">
                <div className="helperText">Deliver supplies here:</div>
                <div className="addressText">
                  {this.state.dropSiteAddress}
                  <br />
                  {this.state.dropSiteZip}
                </div>
              </div>
            </div>
            <span className="group" id="needslist">
              <DropSiteNeedGroup
                backend={this.props.backend}
                needs={this.state.needs}
                handleRemoveRequest={this.handleRemoveRequest}
              />
            </span>
          </div>
          <div className="panel">
            <div className="hospitalNeedsTopBar">
              <div className="hospitalNeedsLeft">
                <h3 className="mb-3">Submit New Request</h3>
              </div>
            </div>
            <NewRequestForm
              dropSiteId={this.props.match.params.id}
              backend={this.props.backend}
              handleAddRequest={this.handleAddRequest}
              handleNewRequest={this.handleNewRequest}
            />
          </div>
          <div className="panel">
            <div className="hospitalNeedsTopBar">
              <div className="hospitalNeedsLeft">
                <h3 className="mb-3">Edit Dropsite Info</h3>
              </div>
            </div>
            <EditDropSiteForm
              dropSiteId={this.props.match.params.id}
              dropSiteName={this.state.dropSiteName}
              dropSiteDescription={this.state.dropSiteDescription}
              dropSiteAddress={this.state.dropSiteAddress}
              dropSiteZip={this.state.dropSiteZip}
              backend={this.props.backend}
              handleEditDropSite={this.handleEditDropSite}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DropSiteAdmin);
