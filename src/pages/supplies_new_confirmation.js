/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import { SupplyConfirmation } from 'components/Confirmation';

function NewSupplyConfirmation({ backend }) {
  return (
    <Page currentProgress={1} totalProgress={5}>
      <SupplyConfirmation backend={backend} />
    </Page>
  );
}

export default NewSupplyConfirmation;
