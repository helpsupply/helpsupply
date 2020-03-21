import React from "react";
import { Button, Modal } from "react-bootstrap";
import NewSupplyForm from "./NewSupplyForm";

class DropSiteNeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.need.status,
      modal: false
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow() {
    this.setState({
      modal: true
    });
  }

  handleClose() {
    this.setState({
      modal: false
    });
  }

  handleStatusChange(event) {
    this.setState({ status: event.target.value });
    this.props.backend.editRequest(
      this.props.need.id,
      null,
      null,
      null,
      null,
      event.target.value
    );
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
          <button
            className="btn btn-primary hospitalNeedsBtn"
            onClick={this.handleShow}
          >
            Contribute
          </button>

          <Modal show={this.state.modal} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.need.requestTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <NewSupplyForm
                backend={this.props.backend}
                dropSiteAddress={this.props.dropSiteAddress}
                dropSiteZip={this.props.dropSiteZip}
                need={this.props.need}
                handleSubmitSuccess={this.handleSubmitSuccess}
              />
            </Modal.Body>
          </Modal>
          {/*   <div className="hospitalNeedsLink">
            <a href="#" className="card-link ml-3">
              What kinds are accepted?
            </a>
          </div> */}
        </div>
      </div>
    );
  }
}

export default DropSiteNeed;
