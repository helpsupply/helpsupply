/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import EmailForm from 'containers/EmailForm';

function SignUp({ backend }) {
  return (
    <Page currentProgress={3} totalProgress={5}>
      <EmailForm backend={backend} />
    </Page>
  );
}

export default SignUp;
