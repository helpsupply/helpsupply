/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Page from 'components/layouts/Page';
import EmotionalFormDate from 'containers/EmotionalFormDate';
import EmotionalFormType from 'containers/EmotionalFormType';

function ServiceEmotional({ backend, step }) {
  const [request, setRequest] = useState(null);
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
      {step === 1 && (
        <EmotionalFormDate
          request={request}
          onSave={updateService}
          id={params.id}
        />
      )}
      {step === 2 && (
        <EmotionalFormType
          request={request}
          onSave={updateService}
          id={params.id}
        />
      )}
    </Page>
  );
}

export default ServiceEmotional;
