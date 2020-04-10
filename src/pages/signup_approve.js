/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import SignupFinish from 'components/SignupFinish';

function SignUpApprove(props) {
  return (
    <Page>
      <SignupFinish {...props} />
    </Page>
  );
}

export default SignUpApprove;
