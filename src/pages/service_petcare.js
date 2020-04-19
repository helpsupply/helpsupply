/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import Page from 'components/layouts/Page';
import PetcareFormLocation from 'containers/PetcareFormLocation';
import PetcareFormDate from 'containers/PetcareFormDate';
import PetcareFormDetails from 'containers/PetcareFormDetails';
import { ErrorContext } from 'state/ErrorProvider';

function ServicePetcare({ backend, step }) {
  const [request, setRequest] = useState(null);
  const params = useParams();
  const { hasError, setError } = useContext(ErrorContext);

  const updateService = async (request) =>
    await backend.updateServiceRequest(params.id, request, true).catch((e) => {
      setError(e.message);
    });

  useEffect(() => {
    if (!params.id || !!hasError) {
      return;
    }
    backend
      .getServiceRequest(params.id)
      .then((data) => {
        setRequest(data);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [setError, hasError, backend, params.id]);

  if (params.id && !request) {
    // loading
    return null;
  }

  return (
    <Page currentProgress={4} totalProgress={5}>
      {step === 1 && (
        <PetcareFormLocation
          request={request}
          onSave={updateService}
          id={params.id}
        />
      )}
      {step === 2 && (
        <PetcareFormDate
          request={request}
          onSave={updateService}
          id={params.id}
        />
      )}
      {step === 3 && (
        <PetcareFormDetails
          request={request}
          onSave={updateService}
          id={params.id}
        />
      )}
    </Page>
  );
}

export default ServicePetcare;
