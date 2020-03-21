import React from "react";

class DropSiteNeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.need.status
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  handleDelete() {
    this.props.backend.deleteRequest(this.props.need.id);
    this.props.handleRemoveRequest(this.props.need.id);
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
          <button className="btn btn-primary hospitalNeedsBtn">
            See Contributions
          </button>
          <div className="deleteRequest">
            <button
              className="btn btn-outline-danger"
              onClick={this.handleDelete}
            >
              Delete
            </button>
          </div>
          <div className="statusSelectGroup">
            <select
              value={this.state.status}
              onChange={this.handleStatusChange}
            >
              <option value="open">Open for contributions</option>
              <option value="fulfilled">Fulfilled</option>
            </select>
          </div>
          {/*<div className="hospitalNeedsLink">
                  <a href="#" className="card-link ml-3">
                    What kinds are accepted?
                  </a>
          </div>*/}
        </div>
      </div>
    );
  }
}

export default DropSiteNeed;
