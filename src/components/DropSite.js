import React from "react";
import * as hospital_index from "../data/hospital_index";
import { withRouter, Link } from "react-router-dom";
import DropSiteNeedGroup from "./DropSiteNeedGroup";
import NewSupplyForm from "./NewSupplyForm";

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
      supply: [],
      cart: []
    };
    this.handleNewSupply = this.handleNewSupply.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }

  handleNewSupply(supplyObj) {
    let oldList = this.state.supply;
    oldList.push(supplyObj);
    this.setState({
      supply: oldList
    });
  }

  handleAddToCart(itemToAdd) {
    let oldList = this.state.cart;
    oldList.push(itemToAdd);
    this.setState({
      cart: oldList
    });
  }

  handleRemoveFromCart(i) {
    let oldList = this.state.cart;
    oldList.splice(i, 1);
    this.setState({
      cart: oldList
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
          dropSiteDescription: data.dropSiteDescription,
          dropSiteHospital: data.dropSiteHospital
        },
        () => {
          //console.log(this.state);
        }
      );
    });
  }

  componentDidUpdate() {}

  render() {
    // this code is for the future when some dropsites may not map to an exisitng hospital in the hospital_index
    let hospital = hospital_index.index.id_index[this.props.match.params.id];
    let hospitalText = "";
    if (typeof hospital === "undefined") {
      hospitalText = (
        <div className="servingText">
          (serving {this.state.dropSiteHospital})
        </div>
      );
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
          <a href="/" className="navbar-brand mb-0 h1 logored">
            help.supply
          </a>
        </nav>
        <div className="content">
          <div className="panelFull">
            <Link
              to={"/signup/" + this.state.dropSiteId}
              className="manageDropSiteLink"
            >
              Manage This Dropsite
            </Link>
            <div className="hospitalNeedsTopBar">
              <div className="hospitalNeedsLeft">
                <div className="dropSiteTitle">
                  <h3 className="mb-3 dropSiteName">
                    {this.state.dropSiteName}
                  </h3>
                  {hospitalText}
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
              <div className="dropSiteInstructionHeader">
                Healthcare workers in this area have requested the following
                items from the public:
              </div>
              <DropSiteNeedGroup
                handleNewSupply={this.handleNewSupply}
                dropSiteAddress={this.state.dropSiteAddress}
                dropSiteZip={this.state.dropSiteZip}
                backend={this.props.backend}
                needs={this.state.needs}
                handleAddToCart={this.handleAddToCart}
              />
            </span>
          </div>
          {this.state.cart.length > 0 && (
            <div className="panelFull">
              <NewSupplyForm
                backend={this.props.backend}
                cart={this.state.cart}
                dropSiteName={this.state.dropSiteName}
                dropSiteId={this.state.dropSiteId}
                dropSiteAddress={this.state.dropSiteAddress}
                dropSiteZip={this.state.dropSiteZip}
                handleRemoveFromCart={this.handleRemoveFromCart}
              />
            </div>
          )}
          <div className="panelFull">
            <h4 className="mb-3 dropSiteName">
              What others have donated so far:
            </h4>
            <table className="table table-striped staffTable table-bordered">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {this.state.supply.map((supply, i) => {
                  return (
                    <tr key={i}>
                      <th>{supply.requestTitle}</th>
                      <th>{supply.supplyQuantity}</th>
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
