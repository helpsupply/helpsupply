/** @jsx jsx */
import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import { useParams } from 'react-router-dom';

import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';
import FacilityForm from 'containers/FacilityForm';

function FacilityEdit({ backend }) {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [dropSite, setDropSite] = useState();

  useEffect(() => {
    backend.getDropSites(params.id).then((data) => {
      setDropSite(data);
      setIsLoading(false);
    });
  }, [backend, params.id]);

  return (
    <Page currentProgress={2} totalProgress={5}>
      {isLoading && <PageLoader />}
      {!isLoading && (
        <FacilityForm
          backend={backend}
          dropSite={dropSite}
          dropSiteId={params.id}
        />
      )}
    </Page>
  );
}

export default FacilityEdit;
