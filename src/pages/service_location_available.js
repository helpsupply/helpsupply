/** @jsx jsx */
import { jsx } from '@emotion/core';

import AvailableServices from 'containers/AvailableServices';
import Page from 'components/layouts/Page';

function ServiceLocationAvailable({ backend }) {
  return (
    <Page currentProgress={1} totalProgress={5}>
      <AvailableServices backend={backend} />
    </Page>
  );
}

export default ServiceLocationAvailable;
