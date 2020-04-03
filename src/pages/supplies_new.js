/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import SupplyForm from 'containers/SupplyForm';

function NewSupplyRequest({ backend }) {
  return (
    <Page currentProgress={1} totalProgress={5}>
      <SupplyForm backend={backend} />
    </Page>
  );
}

export default NewSupplyRequest;
