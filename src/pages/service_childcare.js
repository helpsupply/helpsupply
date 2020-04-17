/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import ChildcareFormLocation from 'containers/ChildcareFormLocation';
import ChildcareFormDate from 'containers/ChildcareFormDate';
import ChildcareFormDetails from 'containers/ChildcareFormDetails';
import ChildcareFormOptions from 'containers/ChildcareFormOptions';
import { useParams } from 'react-router-dom';

function ServiceChildcare({ backend, step }) {
  const params = useParams();
  const updateService = (request) => {
    backend.updateServiceRequest(params.id, request, true);
  };
  return (
    <Page currentProgress={4} totalProgress={5}>
      {step === 1 && (
        <ChildcareFormLocation onSave={updateService} id={params.id} />
      )}
      {step === 2 && (
        <ChildcareFormDate onSave={updateService} id={params.id} />
      )}
      {step === 3 && (
        <ChildcareFormDetails onSave={updateService} id={params.id} />
      )}
      {step === 4 && (
        <ChildcareFormOptions onSave={updateService} id={params.id} />
      )}
    </Page>
  );
}

export default ServiceChildcare;
