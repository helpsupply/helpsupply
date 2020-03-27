/** @jsx jsx */
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import Page from 'components/layouts/Page';
import FacilityForm from 'containers/FacilityForm';

function NewFacility(props) {
  return (
    <Page>
      <FacilityForm {...props} />
    </Page>
  );
}

export default withRouter(NewFacility);
