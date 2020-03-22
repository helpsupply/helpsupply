import React from "react";

class EditDropSiteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropSiteName: "",
      dropSiteDescription: "",
      dropSiteAddress: "",
      dropSiteZip: ""
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
        this.state.dropSiteZip
      )
      .then(() => {
        window.location.reload();
      });
  }

  componentDidMount() {}

  render() {
    let newRequestSubmitButton;
    if (
      (this.state.dropSiteName !== "" ||
        this.state.dropSiteDescription !== "" ||
        this.state.dropSiteAddress !== "" ||
        this.state.dropSiteZip !== "") &&
      this.props.verified
    ) {
      newRequestSubmitButton = (
        <button
          className="btn btn-primary linkSubmitBtn"
          onClick={this.handleEditDropSite}
        >
          Update Dropsite
        </button>
      );
    } else {
      newRequestSubmitButton = (
        <button disabled className="btn btn-primary linkSubmitBtn">
          Update Dropsite
        </button>
      );
    }

    return (
      <div className="submitRequestFormContainer">
        <div className="requestFormField">
          <div className="formLabel">Dropsite Name</div>
          <input
            className="form-control newRequestFormField"
            id="dropSiteName"
            placeholder={this.props.dropSiteName}
            value={this.state.dropSiteName}
            onChange={this.handleChange("dropSiteName")}
          />
          <div className="formError">{this.state.dropSiteNameError}</div>
        </div>
        <div className="requestFormField">
          <div className="formLabel">Dropsite Description</div>
          <input
            className="form-control newRequestFormField"
            id="dropSiteDescription"
            placeholder={this.props.dropSiteDescription}
            value={this.state.dropSiteDescription}
            onChange={this.handleChange("dropSiteDescription")}
          />
          <div className="formError">{this.state.dropSiteDescriptionError}</div>
        </div>
        <div className="requestFormField">
          <div className="formLabel">Deliver supplies to this address:</div>
          <input
            className="form-control newRequestFormField"
            id="dropSiteAddress"
            placeholder={this.props.dropSiteAddress}
            value={this.state.dropSiteAddress}
            onChange={this.handleChange("dropSiteAddress")}
          />
          <div className="formError">{this.state.dropSiteAddressError}</div>
        </div>
        <div className="requestFormField">
          <div className="formLabel">Zip</div>
          <input
            className="form-control newRequestFormField"
            id="dropSiteZip"
            placeholder={this.props.dropSiteZip}
            value={this.state.dropSiteZip}
            onChange={this.handleChange("dropSiteZip")}
          />
        </div>
        {newRequestSubmitButton}
      </div>
    );
  }
}

export default EditDropSiteForm;
