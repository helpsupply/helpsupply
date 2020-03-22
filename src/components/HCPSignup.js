import React from "react";
import { withRouter } from "react-router-dom";

class HCPSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      sent: false,
      error: "",
      dropsite: this.props.match.params.dropsite,
    };
    this.submitEmail = this.submitEmail.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  componentDidMount() {}

  submitEmail(event) {
    event.preventDefault();
    this.setState({ sent: true });
    this.props.backend
      .signupWithEmail(this.state.email, this.state.dropsite)
      .catch(alert);
    // TODO: handle exceptions
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <div>
          <div className="entryportal container-sm">
              <h1>Let's get started</h1>
              <p>In order to ensure the data on Help Supply is trustworthy, we need to first verify that your healthcare affiliation.</p>
              <p>Please enter the email you use at work (i.e. kate@kp.org) and we'll send you an email to verify you own it:</p>
            {this.state.sent ? (
              <div className="outlinedbox">
                <span>Thanks! Check your email for a login link.<br />(you can close this tab/window and continue from there)</span>
              </div>
            ) : (
              <form className="linkSubmitGroup" onSubmit={this.submitEmail}>
                <input
                  className="form-control"
                  placeholder="Your institional email, i.e. john@kp.org"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
                <br />
                <button
                  className="btn btn-primary linkSubmitBtn"
                  onClick={this.submitEmail}
                >
                  Send Verification 
                </button>
              </form>
            )}
          </div>
      </div>
    );
  }
}

export default withRouter(HCPSignup);
