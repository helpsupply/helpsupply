/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import GroceryFormLocation from 'containers/GroceryFormLocation';
import GroceryFormDate from 'containers/GroceryFormDate';
import GroceryFormItems from 'containers/GroceryFormItems';

function ServiceGrocery({ step }) {
  return (
    <Page currentProgress={4} totalProgress={5}>
      {step === 1 && <GroceryFormLocation />}
      {step === 2 && <GroceryFormDate />}
      {step === 3 && <GroceryFormItems />}
    </Page>
  );
}

export default ServiceGrocery;
