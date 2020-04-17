/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Page from 'components/layouts/Page';
import AdditionalInfoForm from 'containers/AdditionalInfoForm';

function ServiceAdditionalInfo({ backend }) {
  const [request, setRequest] = useState();
  const params = useParams();

  const updateService = (request) => {
    backend.updateServiceRequest(params.id, request, true);
  };

  useEffect(() => {
    if (!params.id) {
      return;
    }
    backend.getServiceRequest(params.id).then((data) => {
      setRequest(data);
    });
  }, [backend, params.id]);

  if (params.id && !request) {
    // loading
    return null;
  }

  return (
    <Page currentProgress={4} totalProgress={5}>
      <AdditionalInfoForm
        backend={backend}
        id={params.id}
        onSave={updateService}
        request={request}
      />
    </Page>
  );
}

export default ServiceAdditionalInfo;
