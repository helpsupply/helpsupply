import React from "react";
import * as hospital_index from "../data/hospital_index";
import * as needTypes from "../data/needTypes";
import { withRouter } from "react-router-dom";
import DropSiteNeedGroup from "./DropSiteNeedGroup";
import NewRequestForm from "./NewRequestForm";
import EditDropSiteForm from "./EditDropSiteForm";

class DropSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropSiteId: "",
      dropSiteName: "",
      dropSiteAddress: "",
      dropSiteZip: "",
      dropSiteDescription: "",
      needs: [],
      supply: []
    };
    this.handleNewSupply = this.handleNewSupply.bind(this);
  }

  handleNewSupply(supplyObj) {
    let oldList = this.state.supply;
    oldList.push(supplyObj);
    this.setState({
      supply: oldList
    });
  }

  handleChange(event) {}

  handleSubmit(event) {}

  componentDidMount() {
    this.props.backend.getRequests(this.props.match.params.id).then(data => {
      this.setState(
        {
          needs: data
        },
        () => {
          // console.log(this.state);
        }
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
          //console.log(this.state);
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
              <DropSiteNeedGroup
                handleNewSupply={this.handleNewSupply}
                dropSiteAddress={this.state.dropSiteAddress}
                dropSiteZip={this.state.dropSiteZip}
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DropSite);
