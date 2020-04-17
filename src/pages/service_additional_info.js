/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useParams } from 'react-router-dom';

import Page from 'components/layouts/Page';
import AdditionalInfoForm from 'containers/AdditionalInfoForm';

function ServiceAdditionalInfo({ backend }) {
  const params = useParams();

  const updateService = (request) => {
    backend.updateServiceRequest(params.id, request, true);
  };

  return (
    <Page currentProgress={4} totalProgress={5}>
      <AdditionalInfoForm
        backend={backend}
        id={params.id}
        onSave={updateService}
      />
    </Page>
  );
}

export default ServiceAdditionalInfo;
