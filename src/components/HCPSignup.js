import React from "react";
import { withRouter, Link } from "react-router-dom";

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
        <Link to={"/"}>Back</Link>
        <h1 className="logoText">help.supply</h1>
        <div className="verifyContainer container-sm">
          {this.state.sent ? (
            <div>
              <h2>Thank you</h2>
              <p>
                We just sent you an email with a link to verify your email. It
                should arrive within a couple minutes.
              </p>
            </div>
          ) : (
            <div>
              <h2>Enter your work email address</h2>
              <p>We need to verify your email before you request supplies.</p>
              <form className="linkSubmitGroup" onSubmit={this.submitEmail}>
                <input
                  className="form-control"
                  placeholder="Your institional email, i.e. john@kp.org"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
                <p className="small">
                  Note: we will never share your email address with any other
                  parties. <Link to={"/"}>Learn more</Link>
                </p>
                <button
                  className="btn btn-primary linkSubmitBtn"
                  onClick={this.submitEmail}
                >
                  Next
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(HCPSignup);
