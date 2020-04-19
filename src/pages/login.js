/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import LoginForm from 'containers/LoginForm';

function Login({ backend }) {
  return (
    <Page currentProgress={1} totalProgress={5}>
      <LoginForm backend={backend} />
    </Page>
  );
}

export default Login;
