/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import PetcareFormLocation from 'containers/PetcareFormLocation';
import PetcareFormDate from 'containers/PetcareFormDate';
import PetcareFormDetails from 'containers/PetcareFormDetails';
import { useParams } from 'react-router-dom';

function ServicePetcare({ backend, step }) {
  const params = useParams();

  const updateService = (request) => {
    backend.updateServiceRequest(params.id, request, true);
  };
  return (
    <Page currentProgress={4} totalProgress={5}>
      {step === 1 && (
        <PetcareFormLocation onSave={updateService} id={params.id} />
      )}
      {step === 2 && <PetcareFormDate onSave={updateService} id={params.id} />}
      {step === 3 && (
        <PetcareFormDetails onSave={updateService} id={params.id} />
      )}
    </Page>
  );
}

export default ServicePetcare;
