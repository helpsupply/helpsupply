import React from 'react';
import Firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { withRouter } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

class HCPSignupFinish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      confirmEmail: false,
      dropsite: this.props.match.params.dropsite,
    };
    this.ui = new firebaseui.auth.AuthUI(Firebase.auth());

    this.submitEmail = this.submitEmail.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  componentDidMount() {
    const shouldConfirm = this.props.backend.shouldRepromptEmail();
    this.setState({ confirmEmail: shouldConfirm });
    if (shouldConfirm === false) {
      this.submitEmail();
    }
  }

  submitEmail(event) {
    if (event) {
      event.preventDefault();
    }
    let url = window.location.href;
    this.props.backend
      .continueSignup(url, this.state.confirmEmail ? this.state.email : null)
      .then(() => {
        this.props.backend.getRequests(this.state.dropsite).then((requests) => {
          if (requests?.length) {
            this.props.history.push(
              routeWithParams(Routes.DROPSITE_NEW_ADMIN, {
                dropsite: this.state.dropsite,
              }),
            );
            return;
          }

          this.props.history.push(
            routeWithParams(Routes.SUPPLY_NEW_ADMIN, {
              dropsite: this.state.dropsite,
            }),
          );
        });
      });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <div className="homeBox">
        <div className="verifyContainer container-sm">
          {this.state.confirmEmail === true ? (
            <div>
              <h2>Please enter your email, once more</h2>
              <form className="linkSubmitGroup" onSubmit={this.submitEmail}>
                <input
                  className="linkTitle form-control"
                  id="linkTitle"
                  placeholder="Your email, once more"
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
            </div>
          ) : (
            <h2>Logging you in!</h2>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(HCPSignupFinish);
