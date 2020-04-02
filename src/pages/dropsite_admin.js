/** @jsx jsx */
import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import { useHistory, useParams } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import DropSiteAdmin from 'components/Dropsite/Admin';
import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';

function AdminDropSite({ backend }) {
  const history = useHistory();
  const params = useParams();

  const [dropSite, setDropSite] = useState(undefined);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    backend.getDropSites(params.id).then((data) => {
      data && setDropSite({ ...data, dropSiteId: data.location_id });
      setIsLoading(false);
    });
    backend.getRequests(params.id).then((data) => {
      data && setRequests(data);
    });
  }, [backend, params.id]);

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

  return (
    <Page currentProgress={4} totalProgress={5}>
      {isLoading && <PageLoader />}
      {!isLoading && !!dropSite && (
        <DropSiteAdmin
          onDelete={deleteRequest}
          {...{
            dropSite,
            requests,
            handleUpdateContact,
            handleUpdateLocation,
            handleRequestSupplies,
          }}
        />
      )}
    </Page>
  );
}

export default AdminDropSite;
