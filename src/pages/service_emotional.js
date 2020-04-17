/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import EmotionalFormDate from 'containers/EmotionalFormDate';
import EmotionalFormType from 'containers/EmotionalFormType';
import { useParams } from 'react-router-dom';

function ServiceEmotional({ backend, step }) {
  const params = useParams();

  const updateService = (request) => {
    backend.updateServiceRequest(params.id, request, true);
  };
  return (
    <Page currentProgress={4} totalProgress={5}>
      {step === 1 && (
        <EmotionalFormDate onSave={updateService} id={params.id} />
      )}
      {step === 2 && (
        <EmotionalFormType onSave={updateService} id={params.id} />
      )}
    </Page>
  );
}

export default ServiceEmotional;
