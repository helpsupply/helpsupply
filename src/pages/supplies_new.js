/** @jsx jsx */
import { jsx } from '@emotion/core';
import BackButton from 'components/BackButton';
import Box from 'components/Box';
import SupplyForm from 'containers/SupplyForm';
import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class NewSupplyRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: true,
      loading: true,
      badDomain: false,
    };
    this.checkVerification = this.checkVerification.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  checkVerification() {
    if (!this.props.backend.isLoggedIn()) {
      setTimeout(this.checkVerification, 100);
      return;
    }

    this.props.backend.isValidHealthcareWorker().then((verified) => {
      if (verified) {
        console.log('verified');
        this.setState({
          loading: false,
          verified: true,
        });
      } else {
        this.setState({
          loading: false,
          verified: false,
          badDomain: this.props.backend.badDomain,
        });
        console.log('not verified, will try again in 30 seconds');
        setTimeout(this.checkVerification, 10000);
      }
    });
  }

  componentDidMount() {
    this.checkVerification();
  }

  onSubmit(hospital) {
    this.props.backend.addNewSupplyRequest(hospital).then((data) => {
      let url = '/dropsite/' + data + '/admin';
      this.props.history.push(url);
    });
  }

  render() {
    let content = (
      <Fragment>
        <BackButton />
        <SupplyForm />
      </Fragment>
    );

    if (this.state.loading) {
      content = (
        <div className="alert alert-warning" role="alert">
          <div className="spinner-border alertSpinner" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="alertText">
            Verifying your credentials (should be a few minutes). You'll be able
            to edit/add once verified.
          </div>
        </div>
      );
    }

    if (!this.state.verified && this.state.badDomain) {
      content = (
        <div className="alert alert-danger" role="alert">
          <div className="alertText">
            Your email doesn't look like it's from a healthcare provider. Please{' '}
            <a
              href="/logout"
              style={{
                color: '#721c24',
                fontWeight: 'bold',
                textDecoration: 'underline',
              }}
            >
              log out
            </a>{' '}
            and try your work email or contact{' '}
            <a href="mailto:help@help.supply">help@help.supply</a>.
          </div>
        </div>
      );
    }

    return <Box>{content}</Box>;
  }
}

export default withRouter(NewSupplyRequest);
