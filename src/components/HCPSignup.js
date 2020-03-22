import React from "react";
import { withRouter } from "react-router-dom";

class HCPSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      sent: false,
      error: "",
      dropsite: this.props.match.params.dropsite
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
      <div className="homeBox">
        <div className="verifyContainer container-sm">
          <h2>Verify with work email</h2>
          <p>
            To keep requests effective, we need to verify your healthcare
            affiliation.
          </p>
          <p className="small">
            Please enter the email you use at work
            <br />
            (i.e. kate@kp.org)
          </p>
          {this.state.sent ? (
            <div className="verificationSent">
              <span className="big">
                Thanks! Check your email for a login link (it may take a few).
              </span>
              <br />
              <span className="small">(You can close this window now.)</span>
            </div>
          ) : (
            <form className="linkSubmitGroup" onSubmit={this.submitEmail}>
              <input
                className="form-control"
                placeholder="Your institional email, i.e. john@kp.org"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
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
