/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { buildServicesOptions } from 'lib/utils/services';
import { useAuth } from 'hooks/useAuth';

import Page from 'components/layouts/Page';
import ServiceTypeForm from 'containers/ServiceTypeForm';
import { ErrorContext } from 'state/ErrorProvider';

function ServiceType({ backend }) {
  const { isInitializing } = useAuth();
  const { setError } = useContext(ErrorContext);
  const [request, setRequest] = useState();
  const [serviceOptions, setServiceOptions] = useState();
  const params = useParams();
  const [zip, setZip] = useState();

  useEffect(() => {
    if (!params.id) {
      return;
    }
    backend.getServiceRequest(params.id).then((data) => {
      setRequest(data);
    });
  }, [setError, backend, params.id]);

  const updateService = async (request) =>
    await backend.updateServiceRequest(params.id, request, true).catch((e) => {
      setError(e.message);
    });

  useEffect(() => {
    if (isInitializing) {
      return;
    }
    backend
      .getServiceUser()
      .then(({ data }) => {
        const sOpts = buildServicesOptions(backend.getServicesForZip(data.zip));
        setServiceOptions(sOpts);
        setZip(data.zip);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [backend, isInitializing, setError]);

  return (
    <Page currentProgress={4} totalProgress={5}>
      <ServiceTypeForm
        backend={backend}
        id={params.id}
        onSave={updateService}
        request={request}
        serviceOptions={serviceOptions}
        zip={zip}
      />
    </Page>
  );
}

export default ServiceType;
