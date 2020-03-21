import React from "react";
import { Button, Modal } from "react-bootstrap";
import NewSupplyForm from "./NewSupplyForm";

class DropSiteNeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.need.status,
      qty: 0
    };
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleQtyChange(event) {
    let qty = 0;
    if (event.target.value > 0) {
      this.setState({
        qty: event.target.value
      });
    }
  }

  handleAddToCart() {
    let item = {
      requestId: this.props.need.id
        .substr(this.props.need.id.length - 5)
        .toUpperCase(),
      requestTitle: this.props.need.requestTitle,
      requestQuantity: this.state.qty
    };
    this.props.handleAddToCart(item);
  }

  render() {
    return (
      <div className="card hospitalNeedCard">
        <div className="card-body">
          <h5 className="card-title">
            {this.props.need.requestTitle}{" "}
            <span className="need-id">
              {this.props.need.id
                .substr(this.props.need.id.length - 5)
                .toUpperCase()}
            </span>
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            <b>Qty: </b>
            {this.props.need.requestQuantity}
          </h6>
          <p className="card-text">{this.props.need.requestDescription}</p>
          <input
            type="number"
            className="form-control qtyInput"
            id="qty"
            placeholder="i.e. 50"
            onChange={this.handleQtyChange}
          ></input>
          {this.state.qty > 0 ? (
            <button
              className="btn btn-primary hospitalNeedsBtn"
              onClick={this.handleAddToCart}
            >
              Add to donation
            </button>
          ) : (
            <button
              disabled
              className="btn btn-primary hospitalNeedsBtn"
              onClick={this.handleAddToCart}
            >
              Add to donation
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default DropSiteNeed;
