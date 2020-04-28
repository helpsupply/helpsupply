/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import PrivacyPolicy from 'components/PrivacyPolicy';

function Privacy() {
  return (
    <Page hasBackButton={false}>
      <PrivacyPolicy />
    </Page>
  );
}

export default Privacy;
