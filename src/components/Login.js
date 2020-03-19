import React from "react";
import Firebase from "firebase";
import * as firebaseui from "firebaseui";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ui = new firebaseui.auth.AuthUI(Firebase.auth());
  }

  componentDidMount() {
    this.ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById("loader").style.display = "none";
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: "popup",
      signInSuccessUrl: "/",
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        Firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    });
  }

  render() {
    return (
      <div className="loginContainer">
        <h1>Moderator Signin</h1>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
      </div>
    );
  }
}

export default Login;
