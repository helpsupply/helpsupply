/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useContext, useEffect, useState } from 'react';

import { useAuth } from 'hooks/useAuth';

import ServiceLocationUpdateForm from 'containers/ServiceLocationUpdateForm';
import Page from 'components/layouts/Page';
import { ErrorContext } from 'state/ErrorProvider';

function ServiceLocationUpdate({ backend }) {
  const { isInitializing } = useAuth();
  const { setError } = useContext(ErrorContext);
  const [serviceUser, setServiceUser] = useState();

  useEffect(() => {
    if (isInitializing) {
      return;
    }
    backend
      .getServiceUser()
      .then((res) => {
        setServiceUser(res);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [backend, isInitializing, setError]);

  if (isInitializing || !serviceUser) {
    return null;
  }

  return (
    <Page>
      <ServiceLocationUpdateForm backend={backend} serviceUser={serviceUser} />
    </Page>
  );
}

export default ServiceLocationUpdate;
