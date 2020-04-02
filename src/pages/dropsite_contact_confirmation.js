/** @jsx jsx */
import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import { useHistory, useParams } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';
import { ContactConfirmation } from 'components/Confirmation';

function ContactDropSiteConfirmation({ backend }) {
  const history = useHistory();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [dropSite, setDropSite] = useState();

  useEffect(() => {
    backend.getDropSites(params.id).then((data) => {
      setDropSite(data);
      setIsLoading(false);
    });
  }, [backend, params.id]);

  const handleOnEdit = () => {
    history.push(
      routeWithParams(Routes.DROPSITE_CONTACT, {
        id: params.id,
      }),
    );
  };

  return (
    <Page
      onBackButtonClick={() =>
        history.push(
          routeWithParams(Routes.DROPSITE_ADMIN, {
            id: params.id,
          }),
        )
      }
      currentProgress={4}
      totalProgress={5}
    >
      {isLoading && <PageLoader />}
      {!isLoading && !!dropSite && (
        <ContactConfirmation
          onEdit={handleOnEdit}
          name={dropSite.dropSiteName}
          contact={dropSite.dropSitePhone}
        />
      )}
    </Page>
  );
}

export default ContactDropSiteConfirmation;
