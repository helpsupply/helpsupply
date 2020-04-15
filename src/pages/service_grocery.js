/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import GroceryFormLocation from 'containers/GroceryFormLocation';
import GroceryFormDate from 'containers/GroceryFormDate';
import GroceryFormItems from 'containers/GroceryFormItems';
import { useParams } from 'react-router-dom';

function ServiceGrocery({ backend, step }) {
  const params = useParams();

  const updateService = (request) => {
    backend.updateServiceRequest(params.id, request, true);
  };
  return (
    <Page currentProgress={4} totalProgress={5}>
      {step === 1 && (
        <GroceryFormLocation onSave={updateService} id={params.id} />
      )}
      {step === 2 && <GroceryFormDate onSave={updateService} id={params.id} />}
      {step === 3 && <GroceryFormItems onSave={updateService} id={params.id} />}
    </Page>
  );
}

export default ServiceGrocery;
