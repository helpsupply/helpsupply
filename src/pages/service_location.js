/** @jsx jsx */
import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';

import { useAuth } from 'hooks/useAuth';

import ServiceLocationForm from 'containers/ServiceLocationForm';
import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';

function ServiceLocation({ backend }) {
  const { isInitializing, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(isInitializing);
  const [serviceUser, setServiceUser] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    backend.getServiceUser().then((user) => {
      setServiceUser(user);
      setIsLoading(false);
    });
  }, [backend, isLoggedIn, setIsLoading]);

  return (
    <Page currentProgress={3} totalProgress={5}>
      {isLoading && <PageLoader />}
      {!isLoading && (
        <ServiceLocationForm backend={backend} serviceUser={serviceUser} />
      )}
    </Page>
  );
}

export default ServiceLocation;
