import React from "react";

class EditDropSiteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropSiteName: "",
      dropSiteDescription: "",
      dropSiteAddress: "",
      dropSiteZip: "",
      dropSitePhone: ""
    };
    this.handleEditDropSite = this.handleEditDropSite.bind(this);
  }

  handleChange = field => e => {
    if (field === "dropSiteName") {
      this.setState({
        dropSiteName: e.target.value
      });
    } else if (field === "dropSiteDescription") {
      this.setState({
        dropSiteDescription: e.target.value
      });
    } else if (field === "dropSiteAddress") {
      this.setState({
        dropSiteAddress: e.target.value
      });
    } else if (field === "dropSitePhone") {
      this.setState({
        dropSitePhone: e.target.value
      });
    }
    if (field === "dropSiteZip") {
      this.setState({
        dropSiteZip: e.target.value
      });
    }
  };

  handleEditDropSite() {
    this.props.backend
      .editDropSite(
        this.props.dropSiteId,
        this.state.dropSiteName,
        this.state.dropSiteDescription,
        this.state.dropSiteAddress,
        this.state.dropSiteZip,
        this.state.dropSitePhone
      )
      .then(() => {
        window.location.reload();
      });
  }

  componentWillReceiveProps() {
    this.setState({
      dropSiteName: this.props.dropSiteName,
      dropSiteDescription: this.props.dropSiteDescription,
      dropSiteAddress: this.props.dropSiteAddress,
      dropSiteZip: this.props.dropSiteZip,
      dropSitePhone: this.props.dropSitePhone
    });
  }

  render() {
    let newRequestSubmitButton;
    if (
      (this.state.dropSiteName !== "" ||
        this.state.dropSiteDescription !== "" ||
        this.state.dropSiteAddress !== "" ||
        this.state.dropSiteZip !== "" ||
        this.state.dropSitePhone !== "") &&
      this.props.verified
    ) {
      newRequestSubmitButton = (
        <button
          className="btn btn-primary linkSubmitBtn"
          onClick={this.handleEditDropSite}
        >
          Update Drop-off Location
        </button>
      );
    } else {
      newRequestSubmitButton = (
        <button disabled className="btn btn-primary linkSubmitBtn">
          Update Drop-off Location
        </button>
      );
    }

    return (
      <div className="submitRequestFormContainer">
        <div className="requestFormField">
          <div className="formLabel">Drop-off Location Name</div>
          <input
            className="form-control newRequestFormField"
            id="dropSiteName"
            value={this.state.dropSiteName || ""}
            onChange={this.handleChange("dropSiteName")}
          />
          <div className="formError">{this.state.dropSiteNameError}</div>
        </div>
        <div className="requestFormField">
          <div className="formLabel">Drop-off Location Description</div>
          <input
            className="form-control newRequestFormField"
            id="dropSiteDescription"
            value={this.state.dropSiteDescription || ""}
            onChange={this.handleChange("dropSiteDescription")}
          />
          <div className="formError">{this.state.dropSiteDescriptionError}</div>
        </div>
        <div className="requestFormField">
          <div className="formLabel">Deliver supplies to this address:</div>
          <input
            className="form-control newRequestFormField"
            id="dropSiteAddress"
            value={this.state.dropSiteAddress || ""}
            onChange={this.handleChange("dropSiteAddress")}
          />
          <div className="formError">{this.state.dropSiteAddressError}</div>
        </div>
        <div className="requestFormField">
          <div className="formLabel">Zip</div>
          <input
            className="form-control newRequestFormField"
            id="dropSiteZip"
            value={this.state.dropSiteZip || ""}
            onChange={this.handleChange("dropSiteZip")}
          />
          <div className="formError">{this.state.dropSiteZipError}</div>
        </div>
        <div className="requestFormField">
          <div className="formLabel">Phone or Email (Optional)</div>
          <input
            className="form-control newRequestFormField"
            id="dropSitePhone"
            value={this.state.dropSitePhone || ""}
            onChange={this.handleChange("dropSitePhone")}
          />
        </div>
        {newRequestSubmitButton}
      </div>
    );
  }
}

export default EditDropSiteForm;
