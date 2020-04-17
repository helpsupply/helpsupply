/** @jsx jsx */
import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';
import { ContactConfirmation } from 'components/Confirmation';

import { useAuth } from 'hooks/useAuth';

function ContactConfirmationPage({ backend }) {
  const history = useHistory();
  const { isInitializing, isLoggedIn, user: firebaseUser } = useAuth();
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
          onEdit={handleOnEdit}
          email={firebaseUser.email}
          serviceUser={serviceUser}
        />
      )}
    </Page>
  );
}

export default ContactConfirmationPage;
