/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import Page from 'components/layouts/Page';
import FacilityForm from 'containers/FacilityForm';

class NewFacility extends React.Component {
  render() {
    return (
      <Page>
        <FacilityForm {...this.props} />
      </Page>
    );
  }
}

export default withRouter(NewFacility);
