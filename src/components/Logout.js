import React from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.backend.firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.history.push('/');
      });
  }

  render() {
    return (
      <div className="loginContainer">
        <h1>Logging you out</h1>
      </div>
    );
  }
}

export default withRouter(Logout);
