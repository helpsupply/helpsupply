/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import Page from 'components/layouts/Page';
import DropSiteAdmin from 'components/DropSiteAdmin';

class AdminDropSite extends React.Component {
  constructor(props) {
    super(props);
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
  }

  render() {
    return (
      <Page>
        <DropSiteAdmin backend={this.props.backend} {...this.state} />
      </Page>
    );
  }
}

export default withRouter(AdminDropSite);
