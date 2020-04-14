/** @jsx jsx */
import { jsx } from '@emotion/core';

import { Color } from 'lib/theme';

import Page from 'components/layouts/Page';
import EntryContent from 'components/EntryContent';

const containerStyles = {
  background: Color.PRIMARY,
};

function EntryPortal() {
  return (
    <Page
      isHome
      hasBackButton={false}
      contentContainerStyles={containerStyles}
      rootContainerStyles={containerStyles}
    >
      <EntryContent />
    </Page>
  );
}

export default EntryPortal;
