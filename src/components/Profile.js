import React from "react";
import Firebase from "firebase";
import * as firebaseui from "firebaseui";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        auth: ''
    };
  }

  componentDidMount() {
    this.props.backend.firebase.auth().onAuthStateChanged((user) => {
        this.setState({auth: JSON.stringify(user || "not authenticated")});
    });
  }

  render() {
    return (
      <div className="loginContainer">
        <h1>Profile</h1>
        <div>{this.state.auth}</div>
      </div>
    );
  }
}

export default Profile;
