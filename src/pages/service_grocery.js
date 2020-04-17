/** @jsx jsx */
import { jsx } from '@emotion/core';

import Page from 'components/layouts/Page';
import GroceryFormLocation from 'containers/GroceryFormLocation';
import GroceryFormDate from 'containers/GroceryFormDate';
import GroceryFormItems from 'containers/GroceryFormItems';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ServiceGrocery({ backend, step }) {
  const [request, setRequest] = useState(request);
  const params = useParams();

  const updateService = (request) => {
    backend.updateServiceRequest(params.id, request, true);
  };

  useEffect(() => {
    if (!params.id) return;
    backend.getServiceRequest(params.id).then((data) => {
      setRequest(data);
    });
  }, []);

  if (params.id && !request) {
    // loading
    return null;
  }

  return (
    <Page currentProgress={4} totalProgress={5}>
      {step === 1 && (
        <GroceryFormLocation
          request={request}
          onSave={updateService}
          id={params.id}
        />
      )}
      {step === 2 && (
        <GroceryFormDate
          request={request}
          onSave={updateService}
          id={params.id}
        />
      )}
      {step === 3 && (
        <GroceryFormItems
          request={request}
          onSave={updateService}
          id={params.id}
        />
      )}
    </Page>
  );
}

export default ServiceGrocery;
