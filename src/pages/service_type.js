/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import ServiceTypeForm from 'containers/ServiceTypeForm';

function ServiceType({ backend }) {
  return (
    <Page currentProgress={3} totalProgress={5}>
      <ServiceTypeForm backend={backend} />
    </Page>
  );
}

export default ServiceType;
