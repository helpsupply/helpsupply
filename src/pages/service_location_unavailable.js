/** @jsx jsx */
import { jsx } from '@emotion/core';

import EmailListForm from 'containers/EmailListForm';
import Page from 'components/layouts/Page';

function ServiceLocationUnavailable({ backend }) {
  return (
    <Page>
      <EmailListForm backend={backend} />
    </Page>
  );
}

export default ServiceLocationUnavailable;
