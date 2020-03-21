import React from "react";
import * as hospital_index from "../data/hospital_index";
import * as needTypes from "../data/needTypes";
import { withRouter } from "react-router-dom";
import LinksResult from "./LinksResult";
import DropSiteNeedGroupAdmin from "./DropSiteNeedGroupAdmin";
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
      needs: [],
      supply: [],
      verified: true,
    };
    this.handleRemoveRequest = this.handleRemoveRequest.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.checkVerification = this.checkVerification.bind(this);
  }

  handleNewRequest(requestObj) {
    let oldList = this.state.needs;
    oldList.push(requestObj);
    this.setState({
      needs: oldList
    });
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

  handleDeleteSupply(supplyId) {
    this.props.backend.deleteSupply(supplyId);
    let oldList = this.state.supply;
    let newList = oldList.filter(function(obj) {
      return obj.id !== supplyId;
    });
    this.setState({
      supply: newList
    });
  }

  checkVerification() {
    if (!this.props.backend.isLoggedIn()) {
      setTimeout(this.checkVerification, 100);
      return;
    } 
    
    this.props.backend.isValidHealthcareWorker().then(verified => {
      if (verified) {
        this.setState({
          verified: true
        });
      } else {
        this.setState({
          verified: false 
        });
        console.log("not verified, will try again in 30 seconds");
        setTimeout(this.checkVerification, 10000);
      }
    });
  }

  componentDidMount() {
    this.props.backend.getRequests(this.props.match.params.id).then(data => {
      this.setState(
        {
          needs: data
        },
        () => {}
      );
    });
    this.props.backend.listSupply(this.props.match.params.id).then(data => {
      this.setState(
        {
          supply: data
        },
        () => {
          // console.log(this.state);
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

    this.checkVerification();
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
        {this.state.verified === false && (
          <div className="alert alert-warning alertFixed" role="alert">
            <div className="spinner-border alertSpinner" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="alertText">
              Verifying your credentials (should be a few minutes). You'll be
              able to edit/add once verified.
            </div>
          </div>
        )}
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1" id="hospitalname">
            <div className="dropSiteIdText">
              <b>Dropsite: {this.state.dropSiteId}</b>
            </div>{" "}
            {hospitalText}
          </span>
          <a href="/" className="navbar-brand mb-0 h1 logored">
            help.supply
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
              <DropSiteNeedGroupAdmin
                verified={this.state.verified}
                backend={this.props.backend}
                needs={this.state.needs}
                handleRemoveRequest={this.handleRemoveRequest}
              />
            </span>
          </div>
          <div className="panelFull">
            <h4 className="mb-3 dropSiteName">Current contributions</h4>
            <table className="table table-striped staffTable table-bordered">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Delivery Time</th>
                  <th>Comments</th>
                  <th>Cell Phone / Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.supply.map((supply, i) => {
                  return (
                    <tr key={i}>
                      <th>
                        {supply.requestId
                          .substr(supply.requestId.length - 5)
                          .toUpperCase()}
                      </th>
                      <th>{supply.requestTitle}</th>
                      <th>{supply.supplyQuantity}</th>
                      <th>{supply.supplyDeliveryTime}</th>
                      <th>{supply.supplyComments}</th>
                      <th>{supply.supplyPhone}</th>
                      <th>
                        {this.state.verified === true && (
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => {
                              this.handleDeleteSupply(supply.id);
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="panel">
            <div className="hospitalNeedsTopBar">
              <div className="hospitalNeedsLeft">
                <h3 className="mb-3">Submit New Request</h3>
              </div>
            </div>
            <NewRequestForm
              verified={this.state.verified}
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
              verified={this.state.verified}
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
