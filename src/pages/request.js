/** @jsx jsx */
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import Page from 'components/layouts/Page';
import FindFacility from 'containers/FindFacility';

function Request(props) {
  return (
    <Page>
      <FindFacility {...props} />
    </Page>
  );
}

export default withRouter(Request);
