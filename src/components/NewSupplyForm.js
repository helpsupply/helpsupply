import React from "react";

class NewSupplyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supplyDeliveryTime: "",
      supplyPhone: "",
      supplyComments: "",
      supplyQuantity: "",
      supplyPhoneError: "",
      supplyCommentsError: "",
      supplyQuantityError: "",
      supplyDeliveryTimeError: "",
      formActivated: false,
      success: false
    };
    this.handleSupplySubmit = this.handleSupplySubmit.bind(this);
  }

  handleChange = field => e => {
    if (field === "supplyPhone") {
      this.setState({
        supplyPhone: e.target.value
      });
    } else if (field === "supplyComments") {
      this.setState({
        supplyComments: e.target.value
      });
    } else if (field === "supplyQuantity") {
      this.setState({
        supplyQuantity: e.target.value
      });
    } else if (field === "supplyDeliveryTime") {
      this.setState({
        supplyDeliveryTime: e.target.value
      });
    }
  };

  handleValidate = field => e => {
    this.setState({
      formActivated: true
    });
    if (field === "supplyPhone") {
      if (!e.target.value) {
        this.setState({
          supplyPhoneError: "This field is necessary."
        });
      } else {
        this.setState({
          supplyPhoneError: ""
        });
      }
    } else if (field === "supplyComments") {
      if (!e.target.value) {
        this.setState({
          supplyCommentsError: "This field is necessary."
        });
      } else {
        this.setState({
          supplyCommentsError: ""
        });
      }
    } else if (field === "supplyQuantity") {
      if (!e.target.value) {
        this.setState({
          supplyQuantityError: "This field is necessary."
        });
      } else {
        this.setState({
          supplyQuantityError: ""
        });
      }
    } else if (field === "supplyDeliveryTime") {
      if (!e.target.value) {
        this.setState({
          supplyDeliveryTimeError: "This field is necessary."
        });
      } else {
        this.setState({
          supplyDeliveryTimeError: ""
        });
      }
    }
  };

  handleSupplySubmit() {
    this.setState({
      success: true
    });
  }

  render() {
    let newSupplySubmitButton;
    if (
      this.state.supplyPhone &&
      this.state.supplyComments &&
      this.state.supplyQuantity &&
      this.state.formActivated
    ) {
      newSupplySubmitButton = (
        <button
          className="btn btn-primary linkSubmitBtn"
          onClick={this.handleSupplySubmit}
        >
          Contribute
        </button>
      );
    } else {
      newSupplySubmitButton = (
        <button disabled className="btn btn-primary linkSubmitBtn">
          Contribute
        </button>
      );
    }

    const submitForm = (
      <div className="submitSupplyFormContainer">
        <div className="supplyFormField">
          <div className="formLabel">Your cell number</div>
          <input
            className="form-control newSupplyFormField"
            id="supplyPhone"
            placeholder="i.e. 555-555-5555"
            value={this.state.supplyPhone}
            onChange={this.handleChange("supplyPhone")}
            onBlur={this.handleValidate("supplyPhone")}
          />
          <div className="formError">{this.state.supplyPhoneError}</div>
        </div>
        <div className="supplyFormField">
          <div className="formLabel">How many can you provide?</div>
          <input
            className="form-control newSupplyFormField"
            id="supplyQuantity"
            placeholder="i.e. 3 boxes of 200 each. 600 total"
            value={this.state.supplyQuantity}
            onChange={this.handleChange("supplyQuantity")}
            onBlur={this.handleValidate("supplyQuantity")}
          />
          <div className="formError">{this.state.supplyQuantityError}</div>
        </div>
        <div className="supplyFormField">
          <div className="formLabel">When can you deliver it?</div>
          <input
            className="form-control newSupplyFormField"
            id="supplyDeliveryTime"
            placeholder="i.e. April 2, 9am-10am"
            value={this.state.supplyDeliveryTime}
            onChange={this.handleChange("supplyDeliveryTime")}
            onBlur={this.handleValidate("supplyDeliveryTime")}
          />
          <div className="formError">{this.state.supplyDeliveryTimeError}</div>
        </div>
        <div className="supplyFormField">
          <div className="formLabel">Details about what you're providing</div>
          <textarea
            className="form-control newSupplyFormField"
            id="supplyComments"
            placeholder="i.e. I work in construction and these are unused and open masks."
            value={this.state.supplyComments}
            onChange={this.handleChange("supplyComments")}
            onBlur={this.handleValidate("supplyComments")}
          />
          <div className="formError">{this.state.supplyCommentsError}</div>
        </div>
        {newSupplySubmitButton}
      </div>
    );

    const successMessage = (
      <div>
        <div className="supplyInsturctionsAddress">
          <div className="helperText">Deliver supplies here:</div>
          <div className="addressText">
            {this.props.dropSiteAddress}
            <br />
            {this.props.dropSiteZip}
          </div>
        </div>
        <div className="deliveryInstructions">
          <h6>Write the following on the package:</h6>
          <h4>
            Med Drop:
            {this.props.need.id
              .substr(this.props.need.id.length - 5)
              .toUpperCase()}
          </h4>
          <h4>{this.props.need.requestTitle}</h4>
          <h4>From: {this.state.supplyPhone}</h4>
        </div>
      </div>
    );

    return <div>{this.state.success ? successMessage : submitForm}</div>;
  }
}

export default NewSupplyForm;
