import React from "react";
import * as hospital_index from "../data/hospital_index";
import { withRouter } from "react-router-dom";

import { Routes } from "constants/Routes";
import { routeWithParams } from "lib/utils/routes";

class NewDropSiteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropSiteId: "",
      dropSiteName: "",
      dropSiteDescription: "",
      dropSiteAddress: "",
      dropSiteZip: "",
      dropSiteHospital: "",
      dropSiteNameError: "",
      dropSiteDescriptionError: "",
      dropSiteAddressError: "",
      dropSiteZipError: "",
      dropSiteHospitalError: "",
      dropSitePhone: "",
      existingLocation: false
    };
    this.handleEditDropSite = this.handleEditDropSite.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
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
    } else if (field === "dropSiteZip") {
      this.setState({
        dropSiteZip: e.target.value
      });
    } else if (field === "dropSitePhone") {
      this.setState({
        dropSitePhone: e.target.value
      });
    } else if (field === "dropSiteHospital") {
      this.setState({
        dropSiteHospital: e.target.value
      });
    }
  };

  handleValidate = field => e => {
    this.setState({
      formActivated: true
    });
    if (field === "dropSiteName") {
      if (!e.target.value) {
        this.setState({
          dropSiteNameError: "This field is necessary."
        });
      } else {
        this.setState({
          dropSiteNameError: ""
        });
      }
    } else if (field === "dropSiteDescription") {
      if (!e.target.value) {
        this.setState({
          dropSiteDescriptionError: "This field is necessary."
        });
      } else {
        this.setState({
          dropSiteDescriptionError: ""
        });
      }
    } else if (field === "dropSiteAddress") {
      if (!e.target.value) {
        this.setState({
          dropSiteAddressError: "This field is necessary."
        });
      } else {
        this.setState({
          dropSiteAddressError: ""
        });
      }
    } else if (field === "dropSiteZip") {
      if (!e.target.value) {
        this.setState({
          dropSiteZipError: "This field is necessary."
        });
      } else {
        this.setState({
          dropSiteZipError: ""
        });
      }
    } else if (field === "dropSiteHospital") {
      if (!e.target.value) {
        this.setState({
          dropSiteHospitalError: "This field is necessary."
        });
      } else {
        this.setState({
          dropSiteHospitalError: ""
        });
      }
    }
  };

  handleEditDropSite() {
    if (this.state.existingLocation) {
      this.props.backend
        .addDropSite(
          this.state.dropSiteId,
          this.state.dropSiteName,
          this.state.dropSiteDescription,
          this.state.dropSiteAddress,
          this.state.dropSiteZip,
          this.state.dropSitePhone
        )
        .then(() => {
          this.props.history.push(
            routeWithParams(Routes.DROPSITE_ADMIN, {
              id: this.state.dropSiteId
            })
          );
        });
    } else {
      this.props.backend
        .addNewDropSite(
          this.state.dropSiteName,
          this.state.dropSiteDescription,
          this.state.dropSiteAddress,
          this.state.dropSiteZip,
          this.state.dropSiteHospital,
          this.state.dropSitePhone
        )
        .then(data => {
          this.props.history.push(
            routeWithParams(Routes.DROPSITE_ADMIN, {
              id: data
            })
          );
        });
    }
  }

  componentDidMount() {
    if (this.props.dropSiteId) {
      let hospital = hospital_index.index.id_index[this.props.dropSiteId];

      this.setState({
        existingLocation: true,
        dropSiteHospital: hospital.name,
        dropSiteId: this.props.dropSiteId
      });
    } else {
      this.setState({
        dropSiteId: this.props.dropSiteId
      });
    }
  }

  render() {
    let newRequestSubmitButton;
    if (
      this.state.dropSiteName !== "" &&
      this.state.dropSiteDescription !== "" &&
      this.state.dropSiteAddress !== "" &&
      this.state.dropSiteZip !== "" &&
      this.props.verified
    ) {
      newRequestSubmitButton = (
        <button
          className="btn btn-primary linkSubmitBtn"
          onClick={this.handleEditDropSite}
        >
          Add Drop-off Location
        </button>
      );
    } else {
      newRequestSubmitButton = (
        <button disabled className="btn btn-primary linkSubmitBtn">
          Add Drop-off Location
        </button>
      );
    }

    return (
      <div className="centerPanel">
        <div className="submitRequestFormContainer">
          {this.state.existingLocation === false && (
            <div className="requestFormField">
              <div className="formLabel">
                What hospital/clinic does this drop-off serve?
              </div>
              <input
                className="form-control newRequestFormField"
                id="dropSiteHospital"
                placeholder="e.g. New York Presbyterian"
                value={this.state.dropSiteHospital}
                onChange={this.handleChange("dropSiteHospital")}
                onBlur={this.handleValidate("dropSiteHospital")}
              />
              <div className="formError">
                {this.state.dropSiteHospitalError}
              </div>
            </div>
          )}
          {this.state.existingLocation === true && (
            <div className="newDropSiteFormServingText">
              Serving:
              <br /> {this.state.dropSiteHospital}
            </div>
          )}

          <div className="requestFormField">
            <div className="formLabel">Drop-off Location Name</div>
            <input
              className="form-control newRequestFormField"
              id="dropSiteName"
              placeholder="e.g. New York Financial Dist."
              value={this.state.dropSiteName}
              onChange={this.handleChange("dropSiteName")}
              onBlur={this.handleValidate("dropSiteName")}
            />
            <div className="formError">{this.state.dropSiteNameError}</div>
          </div>
          <div className="requestFormField">
            <div className="formLabel">Drop-off Location Description</div>
            <textarea
              className="form-control newRequestFormField"
              id="dropSiteDescription"
              placeholder="e.g. We are 500 healthcare workers serving 30,000 patients. We are currently desparate for supplies..."
              value={this.state.dropSiteDescription}
              onChange={this.handleChange("dropSiteDescription")}
              onBlur={this.handleValidate("dropSiteDescription")}
            />
            <div className="formError">
              {this.state.dropSiteDescriptionError}
            </div>
          </div>
          <div className="requestFormField">
            <div className="formLabel">Deliver supplies to this address:</div>
            <input
              className="form-control newRequestFormField"
              id="dropSiteAddress"
              placeholder="e.g. 330 Broadway Ave, New York, NY"
              value={this.state.dropSiteAddress}
              onChange={this.handleChange("dropSiteAddress")}
              onBlur={this.handleValidate("dropSiteAddress")}
            />
            <div className="formError">{this.state.dropSiteAddressError}</div>
          </div>
          <div className="requestFormField">
            <div className="formLabel">Zip</div>
            <input
              className="form-control newRequestFormField"
              id="dropSiteZip"
              placeholder="e.g. 44502"
              value={this.state.dropSiteZip}
              onChange={this.handleChange("dropSiteZip")}
              onBlur={this.handleValidate("dropSiteZip")}
            />
            <div className="formError">{this.state.dropSiteZipError}</div>
          </div>
          <div className="requestFormField">
            <div className="formLabel">Phone or Email (Optional)</div>
            <input
              className="form-control newRequestFormField"
              id="dropSitePhone"
              placeholder="e.g. admin@hospital.org"
              value={this.state.dropSitePhone}
              onChange={this.handleChange("dropSitePhone")}
              onBlur={this.handleValidate("dropSitePhone")}
            />
          </div>
          {newRequestSubmitButton}
        </div>
      </div>
    );
  }
}

export default withRouter(NewDropSiteForm);
