/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import PetcareFormLocation from 'containers/PetcareFormLocation';
import PetcareFormDate from 'containers/PetcareFormDate';
import PetcareFormDetails from 'containers/PetcareFormDetails';

function ServicePetcare({ step }) {
  return (
    <Page currentProgress={4} totalProgress={5}>
      {step === 1 && <PetcareFormLocation />}
      {step === 2 && <PetcareFormDate />}
      {step === 3 && <PetcareFormDetails />}
    </Page>
  );
}

export default ServicePetcare;
