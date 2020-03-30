/** @jsx jsx */
import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import DropSiteAdmin from 'components/Dropsite/Admin';
import Page from 'components/layouts/Page';
import { routeWithParams } from 'lib/utils/routes';
import { Routes } from 'constants/Routes';

function AdminDropSite({ backend, history, match }) {
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

  const handleUpdateContact = () => {
    history.push(
      routeWithParams(Routes.DROPSITE_CONTACT, {
        id: dropSite.dropSiteId,
      }),
    );
  };

  const handleUpdateLocation = () => {
    history.push(
      routeWithParams(Routes.DROPSITE_NEW_ADMIN, {
        id: dropSite.dropSiteId,
      }),
    );
  };

  const handleRequestSupplies = () => {
    history.push(
      routeWithParams(Routes.SUPPLY_NEW_ADMIN, {
        id: dropSite.dropSiteId,
      }),
    );
  };

  const deleteRequest = (id) => {
    backend.deleteRequest(id).then((data) => {
      setRequests(requests.filter((req) => req.id === data));
    });
  };

  if (!dropSite) {
    return null;
  }

  return (
    <Page currentProgress={4} totalProgress={5}>
      <DropSiteAdmin
        {...{
          dropSite,
          requests,
          handleUpdateContact,
          handleUpdateLocation,
          handleRequestSupplies,
          onDelete: deleteRequest,
        }}
      />
    </Page>
  );
}

export default withRouter(AdminDropSite);
