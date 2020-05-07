/** @jsx jsx */
import { useEffect, useContext, useState } from 'react';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'lib/constants/routes';
import { routeWithParams } from 'lib/utils/routes';

import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';

import ServiceContactForm from 'containers/ServiceContactForm';

import { useAuth } from 'hooks/useAuth';
import { ErrorContext } from 'state/ErrorProvider';

function Contact({ backend }) {
  const history = useHistory();
  const { isInitializing, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(isInitializing);
  const [serviceUser, setServiceUser] = useState(false);
  const { setError } = useContext(ErrorContext);
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    backend
      .getServiceUser()
      .then((user) => {
        setServiceUser(user);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.message);
      });
  }, [setError, backend, isLoggedIn, setIsLoading]);

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
