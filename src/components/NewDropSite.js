import React from "react";
import * as hospital_index from "../data/hospital_index";
import { withRouter } from "react-router-dom";

class NewDropSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: false
    };
    this.checkVerification = this.checkVerification.bind(this);
  }

  checkVerification() {
    this.props.backend.isValidHealthcareWorker().then(verified => {
      if (verified) {
        console.log("verified");
        this.setState({
          verified: true
        });
      } else {
        console.log("not verified, will try again in 30 seconds");
        setTimeout(this.checkVerification, 10000);
      }
    });
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return <div className=""></div>;
  }
}

export default withRouter(NewDropSite);
