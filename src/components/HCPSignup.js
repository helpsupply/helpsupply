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
      <div className="">
        <div className="content">
          <div className="panelFull">
            {this.state.sent ? (
              <span>Check your email!</span>
            ) : (
              <form className="linkSubmitGroup" onSubmit={this.submitEmail}>
                <input
                  className="linkTitle form-control"
                  id="linkTitle"
                  placeholder="Your institional email, i.e. john@kp.org"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
                <button
                  className="btn btn-primary linkSubmitBtn"
                  onClick={this.submitEmail}
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HCPSignup);
