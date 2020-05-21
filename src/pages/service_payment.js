/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { ErrorContext } from 'state/ErrorProvider';

import Page from 'components/layouts/Page';
import ServicePaymentForm from 'containers/ServicePaymentForm';

export const ServicePayment = ({ backend }) => {
  const { setError } = useContext(ErrorContext);
  const [request, setRequest] = useState();
  const params = useParams();

  const updateService = async (request) =>
    await backend.updateServiceRequest(params.id, request, true).catch((e) => {
      setError(e.message);
    });

  useEffect(() => {
    if (!params.id) {
      return;
    }
    backend.getServiceRequest(params.id).then((data) => {
      setRequest(data);
    });
  }, [setError, backend, params.id]);

  return (
    <Page currentProgress={4} totalProgress={5}>
      <ServicePaymentForm
        backend={backend}
        request={request}
        id={params.id}
        onSave={updateService}
      />
    </Page>
  );
};

export default ServicePayment;
