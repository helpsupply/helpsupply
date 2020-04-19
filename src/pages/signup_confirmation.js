/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import { SignUpConfirmation as SignUpConfirmationComponent } from 'components/Confirmation/SignUpConfirmation';

function SignUpConfirmation({ backend }) {
  const email = `**${backend.getEmailForSignIn()}**`;

  return (
    <Page>
      <SignUpConfirmationComponent email={email} />
    </Page>
  );
}

export default SignUpConfirmation;
