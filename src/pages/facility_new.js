/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import FacilityForm from 'containers/FacilityForm';

function NewFacility({ backend }) {
  return (
    <Page currentProgress={2} totalProgress={5}>
      <FacilityForm backend={backend} />
    </Page>
  );
}

export default NewFacility;
