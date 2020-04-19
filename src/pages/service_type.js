/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useContext, useEffect, useState } from 'react';

import { buildServicesOptions } from 'lib/utils/services';
import { useAuth } from 'hooks/useAuth';

import Page from 'components/layouts/Page';
import ServiceTypeForm from 'containers/ServiceTypeForm';
import { ErrorContext } from 'state/ErrorProvider';

function ServiceType({ backend }) {
  const { isInitializing } = useAuth();
  const { setError } = useContext(ErrorContext);
  const [serviceOptions, setServiceOptions] = useState();

  useEffect(() => {
    if (isInitializing) {
      return;
    }
    backend
      .getServiceUser()
      .then(({ data }) => {
        const services = backend.getServicesForZip(data.zip).map((svc) => {
          return svc[0];
        });
        const sOpts = buildServicesOptions(services);
        setServiceOptions(sOpts);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [backend, isInitializing, setError]);

  return (
    <Page currentProgress={4} totalProgress={5}>
      <ServiceTypeForm backend={backend} serviceOptions={serviceOptions} />
    </Page>
  );
}

export default ServiceType;
