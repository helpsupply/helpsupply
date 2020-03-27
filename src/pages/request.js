/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';
import Box from 'components/Box';
import FindFacility from 'containers/FindFacility';
import BackButton from 'components/BackButton';
import Header from 'components/Header';

class Request extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Box>
          <BackButton />
          <FindFacility {...this.props} />
        </Box>
      </Fragment>
    );
  }
}

export default withRouter(Request);
