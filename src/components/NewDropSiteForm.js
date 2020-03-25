import React from "react";
import * as hospital_index from "../data/hospital_index";
import { withRouter } from "react-router-dom";

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
      existingLocation: false,
      stage: "address"
    };
    this.handleEditDropSite = this.handleEditDropSite.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevStage = this.handlePrevStage.bind(this);
  }

  handlePrevStage() {
    if (
      this.state.stage === "address" &&
      this.state.existingLocation === false
    ) {
      this.setState({
        stage: "name"
      });
    } else if (
      this.state.stage === "address" &&
      this.state.existingLocation === true
    ) {
      this.props.history.push("/");
    } else if (this.state.stage === "requirements") {
      this.setState({
        stage: "address"
      });
    } else if (this.state.stage === "info") {
      this.setState({
        stage: "requirements"
      });
    }
  }

  handleNext(dest) {
    this.setState({
      stage: dest
    });
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
    if (field === "dropSiteDescription") {
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
          hospital_index.index.id_index[this.props.dropSiteId],
          this.state.dropSiteDescription,
          this.state.dropSiteAddress,
          this.state.dropSiteZip,
          this.state.dropSitePhone
        )
        .then(() => {
          let url = "/dropsite/" + this.state.dropSiteId + "/admin";
          this.props.history.push(url);
        });
    } else {
      this.props.backend
        .addNewDropSite(
          this.state.dropSiteName,
          this.state.dropSiteDescription,
          this.state.dropSiteAddress,
          this.state.dropSiteZip,
          this.state.dropSiteName,
          this.state.dropSitePhone
        )
        .then(data => {
          let url = "/dropsite/" + data + "/admin";
          this.props.history.push(url);
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
        stage: "name",
        dropSiteId: this.props.dropSiteId
      });
    }
  }

  componentWillReceiveProps() {}

  render() {
    let nextBtnName;
    if (this.state.dropSiteHospital) {
      nextBtnName = (
        <button
          className="btn btn-primary linkSubmitBtn"
          onClick={() => {
            this.handleNext("address");
          }}
        >
          Submit
        </button>
      );
    } else {
      nextBtnName = (
        <button disabled className="btn btn-primary linkSubmitBtn">
          Submit
        </button>
      );
    }
    let nextBtnAddress;
    if (this.state.dropSiteAddress && this.state.dropSiteZip) {
      nextBtnAddress = (
        <button
          className="btn btn-primary linkSubmitBtn"
          onClick={() => {
            this.handleNext("requirements");
          }}
        >
          Submit
        </button>
      );
    } else {
      nextBtnAddress = (
        <button disabled className="btn btn-primary linkSubmitBtn">
          Submit
        </button>
      );
    }
    let nextBtnRequirements;
    if (this.state.dropSiteDescription) {
      nextBtnRequirements = (
        <button
          className="btn btn-primary linkSubmitBtn"
          onClick={() => {
            this.handleNext("info");
          }}
        >
          Submit
        </button>
      );
    } else {
      nextBtnRequirements = (
        <button disabled className="btn btn-primary linkSubmitBtn">
          Submit
        </button>
      );
    }

    let newRequestSubmitButton;
    if (this.props.verified) {
      newRequestSubmitButton = (
        <button
          className="btn btn-primary linkSubmitBtn"
          onClick={this.handleEditDropSite}
        >
          Submit
        </button>
      );
    } else {
      newRequestSubmitButton = (
        <button disabled className="btn btn-primary linkSubmitBtn">
          Submit
        </button>
      );
    }

    return (
      <div className="homeBox">
        <button onClick={this.handlePrevStage}>Back</button>
        <h1 className="logoText">help.supply</h1>
        {this.state.stage === "name" && (
          <div>
            <h2>What's the name of your facility</h2>
            <p>
              This is the name of the hospital or clinic that these donations
              will serve.
            </p>

            <div className="requestFormField">
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
            {nextBtnName}
          </div>
        )}
        {this.state.stage === "address" && (
          <div>
            <h2>Set a drop-off location</h2>
            <p>
              This is where donors can drop off supplies. It should be an easily
              identifiable location including a street address.
            </p>
            <div className="requestFormField">
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
            {nextBtnAddress}
          </div>
        )}

        {this.state.stage === "requirements" && (
          <div>
            <h2>Add requirements</h2>
            <p>
              Please enter any requirements about how supplies should be
              delivered.
            </p>
            <div className="requestFormField">
              <textarea
                className="form-control newRequestFormField"
                id="dropSiteDescription"
                placeholder="e.g. All donated items must be unused and sealed in original packaging...."
                value={this.state.dropSiteDescription}
                onChange={this.handleChange("dropSiteDescription")}
                onBlur={this.handleValidate("dropSiteDescription")}
              />
              <div className="formError">
                {this.state.dropSiteDescriptionError}
              </div>
            </div>
            {nextBtnRequirements}
          </div>
        )}

        {this.state.stage === "info" && (
          <div>
            <h2>More info (optional)</h2>
            <p>
              We’re also working to solve this problem at scale. Can you give us
              the name and contact info of the person at your hospital
              responsible for procuring supplies?
            </p>
            <div className="requestFormField">
              <div className="formLabel">Email or Phone number</div>
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
        )}
      </div>
    );
  }
}

export default withRouter(NewDropSiteForm);
