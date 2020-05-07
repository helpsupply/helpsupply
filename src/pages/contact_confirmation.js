/** @jsx jsx */
import { useEffect, useState, useContext } from 'react';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'lib/constants/routes';
import { routeWithParams } from 'lib/utils/routes';

import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';
import ContactConfirmation from 'components/Confirmation/ContactConfirmation';

import { useAuth } from 'hooks/useAuth';
import { ErrorContext } from 'state/ErrorProvider';

function ContactConfirmationPage({ backend }) {
  const history = useHistory();
  const { isInitializing, isLoggedIn, user: firebaseUser } = useAuth();
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

  const handleOnEdit = () => {
    history.push(routeWithParams(Routes.CONTACT_FORM));
  };

  return (
    <Page
      onBackButtonClick={() =>
        history.push(routeWithParams(Routes.CONTACT_FORM))
      }
      currentProgress={2}
      totalProgress={5}
    >
      {isLoading && <PageLoader />}
      {!isLoading && (
        <ContactConfirmation
          id={serviceUser.id}
          onEdit={handleOnEdit}
          email={firebaseUser.email}
          serviceUser={serviceUser}
        />
      )}
    </Page>
  );
}

export default ContactConfirmationPage;
