/** @jsx jsx */
import { jsx } from '@emotion/core';

import ServiceLocationForm from 'containers/ServiceLocationForm';
import Page from 'components/layouts/Page';

function ServiceLocation({ backend }) {
  return (
    <Page currentProgress={1} totalProgress={5}>
      <ServiceLocationForm backend={backend} />
    </Page>
  );
}

export default ServiceLocation;
