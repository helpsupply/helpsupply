/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import ChildcareFormLocation from 'containers/ChildcareFormLocation';
import ChildcareFormDate from 'containers/ChildcareFormDate';
import ChildcareFormDetails from 'containers/ChildcareFormDetails';
import ChildcareFormOptions from 'containers/ChildcareFormOptions';

function ServiceChildcare({ step }) {
  return (
    <Page currentProgress={4} totalProgress={5}>
      {step === 1 && <ChildcareFormLocation />}
      {step === 2 && <ChildcareFormDate />}
      {step === 3 && <ChildcareFormDetails />}
      {step === 4 && <ChildcareFormOptions />}
    </Page>
  );
}

export default ServiceChildcare;
