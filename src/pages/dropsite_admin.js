/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';
import * as hospital_index from '../data/hospital_index';

import Page from 'components/layouts/Page';
import DropSiteAdmin from 'components/DropSiteAdmin';

class AdminDropSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: true,
      loading: true,
      badDomain: false,
    };
    this.checkVerification = this.checkVerification.bind(this);
  }

  checkVerification() {
    if (!this.props.backend.isLoggedIn()) {
      console.log(this.props.backend.authLoaded);
      if (this.props.backend.authLoaded) {
        let url = '/dropsite/' + this.props.match.params.id;
        this.props.history.push(url);
        return;
      } else {
        setTimeout(this.checkVerification, 100);
      }
      return;
    }

    this.props.backend.isValidHealthcareWorker().then((verified) => {
      if (verified) {
        this.setState({
          verified: true,
          loading: false,
        });
      } else {
        this.setState({
          verified: false,
          badDomain: this.props.backend.badDomain,
          loading: false,
        });
        console.log('not verified, will try again in 30 seconds');
        setTimeout(this.checkVerification, 10000);
      }
    });
  }

  componentDidMount() {
    this.props.backend.getRequests(this.props.match.params.id).then((data) => {
      this.setState(
        {
          needs: data,
        },
        () => {},
      );
    });
    this.props.backend.listSupply(this.props.match.params.id).then((data) => {
      this.setState(
        {
          supply: data,
        },
        () => {
          // console.log(this.state);
        },
      );
    });
    this.props.backend.getDropSites(this.props.match.params.id).then((data) => {
      this.setState(
        {
          dropSiteId: data?.location_id,
          dropSiteName: data?.dropSiteName,
          dropSiteAddress: data?.dropSiteAddress,
          dropSiteZip: data?.dropSiteZip,
          dropSiteDescription: data?.dropSiteDescription,
          dropSiteHospital: data?.dropSiteHospital,
          dropSitePhone: data?.dropSitePhone,
        },
        () => {},
      );
    });

    this.checkVerification();
  }

  render() {
    let content = (
      <DropSiteAdmin backend={this.props.backend} {...this.state} />
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
            and try your work email or contact help@help.supply.
          </div>
        </div>
      );
    }

    return <Page>{content}</Page>;
  }
}

export default withRouter(AdminDropSite);
