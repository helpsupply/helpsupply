/** @jsx jsx */
import { useState } from 'react';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';
import { ContactConfirmation } from 'components/Confirmation';

// todo: Temp values while we build backend for this part.
const TEMP_NAME = 'Temp User';
const TEMP_CONTACT = 'medicalWorker@healthcarefacility.com';

function ContactConfirmationPage() {
  const history = useHistory();

  const [isLoading] = useState(false);

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
          name={TEMP_NAME}
          contact={TEMP_CONTACT}
        />
      )}
    </Page>
  );
}

export default ContactConfirmationPage;
