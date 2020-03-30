/** @jsx jsx */
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import Page from 'components/layouts/Page';
import SupplyForm from 'containers/SupplyForm';

function NewSupplyRequest() {
  return (
    <Page currentProgress={1} totalProgress={5}>
      <SupplyForm />
    </Page>
  );
}

export default withRouter(NewSupplyRequest);
