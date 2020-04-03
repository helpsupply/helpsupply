/** @jsx jsx */
import { useEffect, useCallback, useState } from 'react';
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';
import DropSiteForm from 'containers/DropSiteForm';

function NewDropSite({ backend, history, match }) {
  const [dropSite, setDropSite] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    backend.getDropSites(match.params.id).then((data) => {
      setDropSite(data);
      setIsLoading(false);
    });
  }, [backend, match.params.id]);

  const onSubmit = useCallback(
    (dropSite) => {
      backend.addDropSite(dropSite).then(() => {
        history.push(
          routeWithParams(Routes.DROPSITE_ADMIN, { id: dropSite.location_id }),
        );
      });
    },
    [backend, history],
  );

  return (
    <Page currentProgress={4} totalProgress={5}>
      {isLoading && <PageLoader />}
      {!isLoading && <DropSiteForm onSubmit={onSubmit} dropSite={dropSite} />}
    </Page>
  );
}

export default withRouter(NewDropSite);
