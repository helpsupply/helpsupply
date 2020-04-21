/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import LoginFinish from 'components/LoginFinish';

function LoginApprove(props) {
  return (
    <Page>
      <LoginFinish {...props} />
    </Page>
  );
}

export default LoginApprove;
