/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import Page from 'components/layouts/Page';
import ChildcareFormLocation from 'containers/ChildcareFormLocation';
import ChildcareFormDate from 'containers/ChildcareFormDate';
import ChildcareFormDetails from 'containers/ChildcareFormDetails';
import ChildcareFormOptions from 'containers/ChildcareFormOptions';
import { ErrorContext } from 'state/ErrorProvider';

function ServiceChildcare({ backend, step }) {
  const [request, setRequest] = useState();
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
        setError(e.mesage);
      });
  }, [setError, hasError, backend, params.id]);

  if (params.id && !request) {
    // loading
    return null;
  }
  return (
    <Page currentProgress={4} totalProgress={5}>
      {step === 1 && (
        <ChildcareFormLocation
          request={request}
          onSave={updateService}
          id={params.id}
        />
      )}
      {step === 2 && (
        <ChildcareFormDate
          request={request}
          onSave={updateService}
          id={params.id}
        />
      )}
      {step === 3 && (
        <ChildcareFormDetails
          request={request}
          onSave={updateService}
          id={params.id}
        />
      )}
      {step === 4 && (
        <ChildcareFormOptions
          request={request}
          onSave={updateService}
          id={params.id}
        />
      )}
    </Page>
  );
}

export default ServiceChildcare;
