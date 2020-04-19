/** @jsx jsx */
import { jsx } from '@emotion/core';

import ServiceLocationUpdateForm from 'containers/ServiceLocationUpdateForm';
import Page from 'components/layouts/Page';

function ServiceLocationUpdate({ backend }) {
  return (
    <Page>
      <ServiceLocationUpdateForm backend={backend} />
    </Page>
  );
}

export default ServiceLocationUpdate;
