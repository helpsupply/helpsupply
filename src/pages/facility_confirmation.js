/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { useStateValue } from 'state/StateProvider';

import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';
import { FacilityConfirmation as FacilityConfirmationComponent } from 'components/Confirmation';

function FacilityConfirmation() {
  const history = useHistory();
  const [{ pendingFacility }] = useStateValue();

  const hasPendingFacility =
    !!pendingFacility && !!Object.keys(pendingFacility).length;

  const handleOnEdit = () => {
    history.push(
      routeWithParams(Routes.FACILITY_EDIT, {
        id: pendingFacility.location_id,
      }),
    );
  };

  return (
    <Page currentProgress={2} totalProgress={5}>
      {!hasPendingFacility && <PageLoader />}
      {hasPendingFacility && (
        <FacilityConfirmationComponent
          onEdit={handleOnEdit}
          name={pendingFacility.dropSiteFacilityName}
          streetAddress={pendingFacility.dropSiteAddress}
          city={pendingFacility.dropSiteCity}
          state={pendingFacility.dropSiteState}
          zip={pendingFacility.dropSiteZip}
        />
      )}
    </Page>
  );
}

export default FacilityConfirmation;
