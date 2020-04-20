/** @jsx jsx */
import { useContext, useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import { useParams } from 'react-router-dom';
import { ErrorContext } from 'state/ErrorProvider';

import ServiceReview from 'containers/ServiceReview';
import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';

import { useAuth } from 'hooks/useAuth';

function Review({ backend }) {
  const params = useParams();
  const { isInitializing, isLoggedIn, user } = useAuth();
  const [service, setService] = useState(null);
  const [serviceUser, setServiceUser] = useState(null);
  const [isLoading, setIsLoading] = useState(isInitializing);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    backend
      .getServiceRequest(params.id)
      .then((response) => {
        setService(response);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [setError, params.id, backend]);

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
    <Page currentProgress={5} totalProgress={5}>
      {isLoading && <PageLoader />}
      {!isLoading && (
        <ServiceReview
          backend={backend}
          id={params.id}
          service={service}
          serviceUser={serviceUser?.data}
          user={user}
        />
      )}
    </Page>
  );
}

export default Review;
