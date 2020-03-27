import React from 'react';
import { Form } from 'react-bootstrap';

class NewRequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestType: 'Masks',
      requestTitle: '',
      requestDescription: '',
      requestQuantity: '',
      requestTitleError: '',
      requestDescriptionError: '',
      requestQuantityError: '',
      requestWillingToPay: false,
      formActivated: false,
    };
    this.handleRequestSubmit = this.handleRequestSubmit.bind(this);
    this.handleWillingToPay = this.handleWillingToPay.bind(this);
  }

  handleWillingToPay(e) {
    const value = e.target.checked;
    this.setState({
      requestWillingToPay: value,
    });
  }

  handleChange = (field) => (e) => {
    if (field === 'requestTitle') {
      this.setState({
        requestTitle: e.target.value,
      });
    } else if (field === 'requestDescription') {
      this.setState({
        requestDescription: e.target.value,
      });
    } else if (field === 'requestQuantity') {
      this.setState({
        requestQuantity: e.target.value,
      });
    }
    if (field === 'requestType') {
      this.setState({
        requestType: e.target.value,
      });
    }
  };

  handleValidate = (field) => (e) => {
    this.setState({
      formActivated: true,
    });
    if (field === 'requestTitle') {
      if (!e.target.value) {
        this.setState({
          requestTitleError: 'This field is necessary.',
        });
      } else {
        this.setState({
          requestTitleError: '',
        });
      }
    } else if (field === 'requestDescription') {
      if (!e.target.value) {
        this.setState({
          requestDescriptionError: 'This field is necessary.',
        });
      } else {
        this.setState({
          requestDescriptionError: '',
        });
      }
    } else if (field === 'requestQuantity') {
      if (!e.target.value) {
        this.setState({
          requestQuantityError: 'This field is necessary and must be a number.',
        });
      } else {
        this.setState({
          requestQuantityError: '',
        });
      }
    }
  };

  handleRequestSubmit() {
    let myProps = this.props;
    let myState = this.state;
    this.props.backend
      .addRequest(
        this.props.dropSiteId,
        this.state.requestType,
        this.state.requestTitle,
        this.state.requestDescription,
        this.state.requestQuantity,
        'open',
        this.state.requestWillingToPay,
      )
      .then((data) => {
        let requestObj = {};
        requestObj.id = data;
        requestObj.dropSiteId = myProps.dropSiteId;
        requestObj.requestType = myState.requestType;
        requestObj.requestTitle = myState.requestTitle;
        requestObj.requestDescription = myState.requestDescription;
        requestObj.requestQuantity = myState.requestQuantity;
        requestObj.status = 'open';
        requestObj.requestWillingToPay = myState.requestWillingToPay;
        this.props.handleNewRequest(requestObj);
      });

    this.setState({
      requestType: 'Masks',
      requestTitle: '',
      requestDescription: '',
      requestQuantity: '',
      requestTitleError: '',
      requestDescriptionError: '',
      requestQuantityError: '',
      formActivated: false,
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

    console.log(this.state.requestWillingToPay);

    return (
      <div className="submitRequestFormContainer">
        <div className="requestFormField">
          <div className="formLabel">Item Needed</div>
          <input
            className="form-control newRequestFormField"
            id="requestTitle"
            placeholder="e.g. N95 Masks"
            value={this.state.requestTitle}
            onChange={this.handleChange('requestTitle')}
            onBlur={this.handleValidate('requestTitle')}
          />
          <div className="formError">{this.state.requestTitleError}</div>
        </div>
        <div className="requestFormField">
          <div className="formLabel">Details and Requirements</div>
          <input
            className="form-control newRequestFormField"
            id="requestDescription"
            placeholder="e.g. Unopened boxes only. We are willing to pay $1/mask."
            value={this.state.requestDescription}
            onChange={this.handleChange('requestDescription')}
            onBlur={this.handleValidate('requestDescription')}
          />
          <div className="formError">{this.state.requestDescriptionError}</div>
        </div>
        <div className="requestFormField">
          <div className="formLabel">Quantity</div>
          <input
            className="form-control newRequestFormField"
            id="requestQuantity"
            placeholder="e.g. 50 (must be a number)"
            type="number"
            value={this.state.requestQuantity}
            onChange={this.handleChange('requestQuantity')}
            onBlur={this.handleValidate('requestQuantity')}
          />
          <div className="formError">{this.state.requestQuantityError}</div>
        </div>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            onChange={this.handleWillingToPay}
            type="checkbox"
            checked={this.state.requestWillingToPay}
            label="We are are willing to pay for quality supplies."
          />
        </Form.Group>
        <div className="requestFormField">
          <div className="formLabel">Type</div>
          <div className="requestSelectType">
            <select
              value={this.state.requestType}
              onChange={this.handleChange('requestType')}
            >
              <option value="mask">Masks</option>
              <option value="gowns">Gowns</option>
              <option value="gloves">Gloves</option>
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
