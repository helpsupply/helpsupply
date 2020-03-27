/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import Page from 'components/layouts/Page';
import EmailForm from 'containers/EmailForm';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page>
        <EmailForm {...this.props} />
      </Page>
    );
  }
}

export default withRouter(SignUp);
