/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import Page from 'components/layouts/Page';
import AdditionalInfoForm from 'containers/AdditionalInfoForm';
import { ErrorContext } from 'state/ErrorProvider';

function ServiceAdditionalInfo({ backend }) {
  const [request, setRequest] = useState();
  const params = useParams();
  const { hasError, setError } = useContext(ErrorContext);

  const updateService = async (request) =>
    await backend.updateServiceRequest(params.id, request, true).catch((e) => {
      setError(e.message);
    });

  useEffect(() => {
    if (!params.id || !!hasError) {
      return;
    }
    backend.getServiceRequest(params.id).then((data) => {
      setRequest(data);
    });
  }, [hasError, backend, params.id]);

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
