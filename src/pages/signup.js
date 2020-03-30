/** @jsx jsx */
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import Page from 'components/layouts/Page';
import EmailForm from 'containers/EmailForm';

function SignUp(props) {
  return (
    <Page currentProgress={3} totalProgress={5}>
      <EmailForm {...props} />
    </Page>
  );
}

export default withRouter(SignUp);
