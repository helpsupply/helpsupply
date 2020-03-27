import React from 'react';

class NewSupplyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supplyDeliveryTime: '',
      supplyPhone: '',
      supplyComments: '',
      supplyQuantity: '',
      supplyPhoneError: '',
      supplyCommentsError: '',
      supplyQuantityError: '',
      supplyDeliveryTimeError: '',
      formActivated: false,
      stage: 1,
    };
    this.handleSupplySubmit = this.handleSupplySubmit.bind(this);
    this.handleNextStep = this.handleNextStep.bind(this);
  }

  handleNextStep() {
    this.setState({
      stage: 2,
    });
  }

  handleChange = (field) => (e) => {
    if (field === 'supplyPhone') {
      this.setState({
        supplyPhone: e.target.value,
      });
    } else if (field === 'supplyComments') {
      this.setState({
        supplyComments: e.target.value,
      });
    } else if (field === 'supplyQuantity') {
      this.setState({
        supplyQuantity: e.target.value,
      });
    } else if (field === 'supplyDeliveryTime') {
      this.setState({
        supplyDeliveryTime: e.target.value,
      });
    }
  };

  handleValidate = (field) => (e) => {
    this.setState({
      formActivated: true,
    });
    /* if (field === "supplyPhone") {
      if (!e.target.value) {
        this.setState({
          supplyPhoneError: "This field is necessary."
        });
      } else {
        this.setState({
          supplyPhoneError: ""
        });
      }
    } else */ if (
      field === 'supplyComments'
    ) {
      if (!e.target.value) {
        this.setState({
          supplyCommentsError: 'This field is necessary.',
        });
      } else {
        this.setState({
          supplyCommentsError: '',
        });
      }
    } else if (field === 'supplyDeliveryTime') {
      if (!e.target.value) {
        this.setState({
          supplyDeliveryTimeError: 'This field is necessary.',
        });
      } else {
        this.setState({
          supplyDeliveryTimeError: '',
        });
      }
    }
  };

  handleSupplySubmit() {
    this.setState({
      stage: 3,
    });

    for (var i = 0; i < this.props.cart.length; i++) {
      this.props.backend
        .addSupply(
          this.props.dropSiteId,
          this.props.cart[i].requestId,
          this.props.cart[i].requestTitle,
          this.state.supplyPhone,
          this.props.cart[i].requestQuantity,
          this.state.supplyDeliveryTime,
          this.state.supplyComments,
        )
        .then((data) => {
          console.log(data);
        });
    }
  }

  render() {
    let newSupplySubmitButton;
    if (this.state.supplyComments && this.state.formActivated) {
      newSupplySubmitButton = (
        <div className="finalizeDonationBtn">
          <button
            className="btn btn-success linkSubmitBtn"
            onClick={this.handleSupplySubmit}
          >
            Submit
          </button>
        </div>
      );
    } else {
      newSupplySubmitButton = (
        <div className="finalizeDonationBtn">
          <button disabled className="btn btn-success completeSubmission">
            Submit
          </button>
        </div>
      );
    }

    const cart = (
      <div id="donationForm">
        <div className="dropSiteTitle">
          <h4 className="mb-3 dropSiteName">Review your list of donations:</h4>
        </div>
        <div className="submitSupplyFormContainer">
          <div className="cart">
            <table className="table table-striped staffTable table-bordered">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {this.props.cart.map((supply, i) => {
                  return (
                    <tr key={i}>
                      <th>{supply.requestTitle}</th>
                      <th>{supply.requestQuantity}</th>
                      <th>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => {
                            this.props.handleRemoveFromCart(i);
                          }}
                        >
                          Remove
                        </button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="finalizeDonationContainer">
            <div className="finalizeDonationLabel">
              When you've added all the items you can supply, click finalize
              below:
            </div>
            <div className="finalizeDonationBtn">
              <button
                className="btn btn-success linkSubmitBtn"
                onClick={this.handleNextStep}
              >
                Next: Add my information
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    const submitForm = (
      <div>
        <div className="dropSiteTitle">
          <h4 className="mb-3 dropSiteName">Lastly, add some info:</h4>
        </div>
        <div className="submitSupplyFormContainer">
          <div className="supplyFormField">
            <div className="formLabel">Your email (optional)</div>
            <input
              className="form-control newSupplyFormField"
              id="supplyPhone"
              placeholder="e.g. juan@gmail.com"
              value={this.state.supplyPhone}
              onChange={this.handleChange('supplyPhone')}
              onBlur={this.handleValidate('supplyPhone')}
            />
            <div className="formDisclaimer">
              Note: Your email will be publicly accessible.
            </div>
            <div className="formError">{this.state.supplyPhoneError}</div>
          </div>
          <div className="supplyFormField">
            <div className="formLabel">When can you deliver it?</div>
            <input
              className="form-control newSupplyFormField"
              id="supplyDeliveryTime"
              placeholder="e.g. April 2, 9am-10am"
              value={this.state.supplyDeliveryTime}
              onChange={this.handleChange('supplyDeliveryTime')}
              onBlur={this.handleValidate('supplyDeliveryTime')}
            />
            <div className="formError">
              {this.state.supplyDeliveryTimeError}
            </div>
          </div>
          <div className="supplyFormField">
            <div className="formLabel">Details about what you're providing</div>
            <textarea
              className="form-control newSupplyFormField"
              id="supplyComments"
              placeholder="e.g. I work in construction and these are unused and open masks."
              value={this.state.supplyComments}
              onChange={this.handleChange('supplyComments')}
              onBlur={this.handleValidate('supplyComments')}
            />
            <div className="formError">{this.state.supplyCommentsError}</div>
          </div>
          {newSupplySubmitButton}
        </div>
      </div>
    );

    const successMessage = (
      <div>
        <div className="dropSiteInstructionHeader">
          Thank you. {this.props.dropSiteName} is waiting for your delivery.
        </div>
        <div className="supplyInstructionsAddressForm">
          <div className="helperText">Deliver supplies here:</div>
          <div className="addressText">
            {this.props.dropSiteAddress}
            <br />
            {this.props.dropSiteZip}
          </div>
        </div>
        <div className="deliveryInstructions">
          <h6>
            <b>Separate each package</b> and write on these labels:
          </h6>
          {this.props.cart.map((supply, i) => {
            return (
              <div key={i} className="deliveryLabels">
                <h4>help.supply</h4>
                <h6>
                  {supply.requestId
                    .substr(supply.requestId.length - 5)
                    .toUpperCase()}
                </h6>
                <h3>{supply.requestTitle}</h3>
                <h4>From: {this.state.supplyPhone}</h4>
              </div>
            );
          })}
        </div>
      </div>
    );

    return (
      <div>
        {this.state.stage === 1 && cart}
        {this.state.stage === 2 && submitForm}
        {this.state.stage === 3 && successMessage}
      </div>
    );
  }
}

export default NewSupplyForm;
