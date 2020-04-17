/** @jsx jsx */
import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';

import ServiceContactForm from 'containers/ServiceContactForm';

import { useAuth } from 'hooks/useAuth';

function Contact({ backend }) {
  const history = useHistory();
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
    <Page
      onBackButtonClick={() =>
        // service todo: if user has contact info set, and they have done at least 1 request, route to userDetail page
        // service todo: if user has contact info set, and they have 0 requests, route to /service
        history.push(routeWithParams(Routes.HOME))
      }
      currentProgress={2}
      totalProgress={5}
    >
      {isLoading && <PageLoader />}
      {!isLoading && (
        <ServiceContactForm backend={backend} serviceUser={serviceUser} />
      )}
    </Page>
  );
}

export default Contact;
