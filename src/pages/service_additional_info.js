/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import AdditionalInfoForm from 'containers/AdditionalInfoForm';

function ServiceAdditionalInfo({ backend }) {
  return (
    <Page currentProgress={4} totalProgress={5}>
      <AdditionalInfoForm backend={backend} />
    </Page>
  );
}

export default ServiceAdditionalInfo;
