/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';
import Page from 'components/layouts/Page';
import FindFacility from 'containers/FindFacility';

class Request extends React.Component {
  render() {
    return (
      <Page>
        <FindFacility {...this.props} />
      </Page>
    );
  }
}

export default withRouter(Request);
