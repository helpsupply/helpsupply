/** @jsx jsx */
import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import { useHistory, useParams } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';
import { FacilityConfirmation as FacilityConfirmationComponent } from 'components/Confirmation';

function FacilityConfirmation({ backend }) {
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
      routeWithParams(Routes.FACILITY_EDIT, {
        id: dropSite.location_id,
      }),
    );
  };

  return (
    <Page currentProgress={2} totalProgress={5}>
      {isLoading && <PageLoader />}
      {!isLoading && (
        <FacilityConfirmationComponent
          onEdit={handleOnEdit}
          name={dropSite.dropSiteFacilityName}
          streetAddress={dropSite.dropSiteAddress}
          city={dropSite.dropSiteCity}
          state={dropSite.dropSiteState}
          zip={dropSite.dropSiteZip}
        />
      )}
    </Page>
  );
}

export default FacilityConfirmation;
