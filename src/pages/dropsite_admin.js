/** @jsx jsx */
import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import DropSiteAdmin from 'components/Dropsite/Admin';
import Page from 'components/layouts/Page';

function AdminDropSite({ backend, match }) {
  const [dropSite, setDropSite] = useState(undefined);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    backend.getDropSites(match.params.id).then((data) => {
      data && setDropSite({ ...data, dropSiteId: data.location_id });
    });
    backend.getRequests(match.params.id).then((data) => {
      data && setRequests(data);
    });
  }, [backend, match.params.id]);

  if (!dropSite) {
    return null;
  }

  return (
    <Page currentProgress={4} totalProgress={5}>
      <DropSiteAdmin {...{ dropSite, requests }} />
    </Page>
  );
}

export default withRouter(AdminDropSite);
