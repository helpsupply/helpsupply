import React from "react";

class NewRequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestType: "Masks",
      requestTitle: "",
      requestDescription: "",
      requestQuantity: "",
      requestTitleError: "",
      requestDescriptionError: "",
      requestQuantityError: "",
      formActivated: false
    };
    this.handleRequestSubmit = this.handleRequestSubmit.bind(this);
  }

  handleChange = field => e => {
    if (field === "requestTitle") {
      this.setState({
        requestTitle: e.target.value
      });
    } else if (field === "requestDescription") {
      this.setState({
        requestDescription: e.target.value
      });
    } else if (field === "requestQuantity") {
      this.setState({
        requestQuantity: e.target.value
      });
    }
    if (field === "requestType") {
      this.setState({
        requestType: e.target.value
      });
    }
  };

  handleValidate = field => e => {
    this.setState({
      formActivated: true
    });
    if (field === "requestTitle") {
      if (!e.target.value) {
        this.setState({
          requestTitleError: "This field is necessary."
        });
      } else {
        this.setState({
          requestTitleError: ""
        });
      }
    } else if (field === "requestDescription") {
      if (!e.target.value) {
        this.setState({
          requestDescriptionError: "This field is necessary."
        });
      } else {
        this.setState({
          requestDescriptionError: ""
        });
      }
    } else if (field === "requestQuantity") {
      if (!e.target.value) {
        this.setState({
          requestQuantityError: "This field is necessary."
        });
      } else {
        this.setState({
          requestQuantityError: ""
        });
      }
    }
  };

  handleRequestSubmit() {
    this.props.backend.addRequest(
      this.props.dropSiteId,
      this.state.requestType,
      this.state.requestTitle,
      this.state.requestDescription,
      this.state.requestQuantity,
      "open"
    );
    let requestObj = {};
    requestObj.id = "";
    requestObj.dropSiteId = this.props.dropSiteId;
    requestObj.requestType = this.state.requestType;
    requestObj.requestTitle = this.state.requestTitle;
    requestObj.requestDescription = this.state.requestDescription;
    requestObj.requestQuantity = this.state.requestQuantity;
    requestObj.status = "open";
    this.props.handleNewRequest(requestObj);

    this.setState({
      requestType: "Masks",
      requestTitle: "",
      requestDescription: "",
      requestQuantity: "",
      requestTitleError: "",
      requestDescriptionError: "",
      requestQuantityError: "",
      formActivated: false
    });
  }

  render() {
    let newRequestSubmitButton;
    if (
      this.state.requestTitle &&
      this.state.requestDescription &&
      this.state.requestQuantity &&
      this.state.formActivated &&
      this.props.verified
    ) {
      newRequestSubmitButton = (
        <button
          className="btn btn-primary linkSubmitBtn"
          onClick={this.handleRequestSubmit}
        >
          Create New Request
        </button>
      );
    } else {
      newRequestSubmitButton = (
        <button disabled className="btn btn-primary linkSubmitBtn">
          Create New Request
        </button>
      );
    }

    return (
      <div className="submitRequestFormContainer">
        <div className="requestFormField">
          <div className="formLabel">Title</div>
          <input
            className="form-control newRequestFormField"
            id="requestTitle"
            placeholder="i.e. N95 Masks"
            value={this.state.requestTitle}
            onChange={this.handleChange("requestTitle")}
            onBlur={this.handleValidate("requestTitle")}
          />
          <div className="formError">{this.state.requestTitleError}</div>
        </div>
        <div className="requestFormField">
          <div className="formLabel">Description</div>
          <input
            className="form-control newRequestFormField"
            id="requestDescription"
            placeholder="i.e. Unopened boxes only"
            value={this.state.requestDescription}
            onChange={this.handleChange("requestDescription")}
            onBlur={this.handleValidate("requestDescription")}
          />
          <div className="formError">{this.state.requestDescriptionError}</div>
        </div>
        <div className="requestFormField">
          <div className="formLabel">Quantity</div>
          <input
            className="form-control newRequestFormField"
            id="requestQuantity"
            placeholder="i.e. 50 or As many as possible"
            value={this.state.requestQuantity}
            onChange={this.handleChange("requestQuantity")}
            onBlur={this.handleValidate("requestQuantity")}
          />
          <div className="formError">{this.state.requestQuantityError}</div>
        </div>
        <div className="requestFormField">
          <div className="formLabel">Type</div>
          <div className="requestSelectType">
            <select
              value={this.state.requestType}
              onChange={this.handleChange("requestType")}
            >
              <option value="mask">Masks</option>
              <option value="gowns-gloves">Gowns/Gloves</option>
              <option value="sanitizer">Sanitizer</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        {newRequestSubmitButton}
      </div>
    );
  }
}

export default NewRequestForm;
