/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import ServiceConfirmation from 'containers/ServiceConfirmation';

function Confirmation({ backend }) {
  return (
    <Page currentProgress={5} totalProgress={5}>
      <ServiceConfirmation backend={backend} />
    </Page>
  );
}

export default Confirmation;
