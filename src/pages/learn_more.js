/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import { LearnMore as LearnMoreComponent } from 'components/LearnMore';

function LearnMore() {
  return (
    <Page hasBackButton={false}>
      <LearnMoreComponent />
    </Page>
  );
}

export default LearnMore;
