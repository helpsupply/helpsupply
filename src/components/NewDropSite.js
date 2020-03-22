import React from "react";
import { withRouter } from "react-router-dom";
import NewDropSiteForm from "./NewDropSiteForm";

class NewDropSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: true
    };
    this.checkVerification = this.checkVerification.bind(this);
  }

  checkVerification() {
    if (!this.props.backend.isLoggedIn()) {
      setTimeout(this.checkVerification, 100);
      return;
    }

    this.props.backend.isValidHealthcareWorker().then(verified => {
      if (verified) {
        console.log("verified");
        this.setState({
          verified: true
        });
      } else {
        this.setState({
          verified: false
        });
        console.log("not verified, will try again in 30 seconds");
        setTimeout(this.checkVerification, 10000);
      }
    });
  }

  componentDidMount() {
    this.checkVerification();
  }

  componentDidUpdate() {}

  render() {
    return (
      <div className="newDropSiteContainer">
        {this.state.verified === false && (
          <div className="alert alert-warning alertFixed" role="alert">
            <div className="spinner-border alertSpinner" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="alertText">
              Verifying your credentials (should be a few minutes). You'll be
              able to edit/add once verified.
            </div>
          </div>
        )}
        <NewDropSiteForm
          backend={this.props.backend}
          dropSiteId={this.props.match.params.dropsite}
          verified={this.state.verified}
        />
      </div>
    );
  }
}

export default withRouter(NewDropSite);
