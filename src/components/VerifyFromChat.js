import React from 'react';
import { withRouter } from 'react-router-dom';

class VerifyFromChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Confirming',
      loggedIn: '',
    };
  }

  componentDidMount() {
    this.props.backend.firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loggedIn: user ? 'Logged In' : 'Not Logged In' });
    });

    let url = window.location.href;
    this.props.backend
      .continueSignup(url, this.props.match.params.email)
      .then(() => {
        this.setState({ status: 'Confirmed!' });
      })
      .catch((error) => {
        this.setState({ status: '' + error });
      });
  }

  render() {
    return (
      <div className="loginContainer">
        <div>{this.state.loggedIn}</div>
        <div>{this.state.status}</div>
      </div>
    );
  }
}

export default withRouter(VerifyFromChat);
