/** @jsx jsx */
import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import { useHistory, useParams } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import DropSiteAdmin from 'components/Dropsite/Admin';
import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';
import DeleteRequestModal from 'components/Request/DeleteRequestModal';

function AdminDropSite({ backend }) {
  const history = useHistory();
  const params = useParams();

  const [dropSite, setDropSite] = useState(undefined);
  const [requests, setRequests] = useState([]);
  const [requestIdToBeDeleted, setRequestIdToBeDeleted] = useState(undefined);
  const [requestToBeDeleted, setRequestToBeDeleted] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestsLoading, setIsRequestsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openConfirmDeleteRequestModal = (id) => {
    const selectedRequest = requests.find((request) => request.id === id);

    setRequestIdToBeDeleted(id);
    setRequestToBeDeleted(selectedRequest);

    setIsModalOpen(true);
  };

  const closeConfirmDeleteRequestModal = () => {
    setIsModalOpen(false);

    setRequestIdToBeDeleted(undefined);
    setRequestToBeDeleted(undefined);
  };

  const deleteRequest = () => {
    if (!requestIdToBeDeleted) {
      return;
    }

    setIsRequestsLoading(true);

    backend.deleteRequest(requestIdToBeDeleted).then((data) => {
      setRequests(requests.filter((req) => req.id !== data));

      setIsModalOpen(false);
      setIsRequestsLoading(false);

      setRequestIdToBeDeleted(undefined);
      setRequestToBeDeleted(undefined);
    });
  };

  return (
    <Page currentProgress={4} totalProgress={5}>
      {isLoading && <PageLoader />}
      {!isLoading && !!dropSite && (
        <DropSiteAdmin
          onDelete={openConfirmDeleteRequestModal}
          {...{
            isRequestsLoading,
            dropSite,
            requests,
            handleUpdateContact,
            handleUpdateLocation,
            handleRequestSupplies,
          }}
        />
      )}
      <DeleteRequestModal
        isOpen={isModalOpen}
        deleteRequest={deleteRequest}
        onRequestClose={closeConfirmDeleteRequestModal}
        isLoading={isRequestsLoading}
        request={requestToBeDeleted}
      />
    </Page>
  );
}

export default AdminDropSite;
