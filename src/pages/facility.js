/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import FacilityForm from 'containers/FacilityForm';

function Facility(props) {
  return (
    <Page currentProgress={1} totalProgress={5}>
      <FacilityForm {...props} />
    </Page>
  );
}

export default Facility;
