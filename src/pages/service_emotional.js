/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import EmotionalFormDate from 'containers/EmotionalFormDate';
import EmotionalFormType from 'containers/EmotionalFormType';

function ServiceEmotional({ step }) {
  return (
    <Page currentProgress={4} totalProgress={5}>
      {step === 1 && <EmotionalFormDate />}
      {step === 2 && <EmotionalFormType />}
    </Page>
  );
}

export default ServiceEmotional;
