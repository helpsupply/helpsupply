/** @jsx jsx */
import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import { useHistory /*useParams*/ } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import RequestKinds from 'lib/organizations/kinds';

import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';
import DeleteRequestModal from 'components/Request/DeleteRequestModal';
import UserDashboard from 'components/Dashboard/UserDashboard';

function AdminDashboard({ backend }) {
  const history = useHistory();

  // const [contact, setDropSite] = useState(undefined);
  const [openRequests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [requestToBeDeleted, setRequestToBeDeleted] = useState(undefined);
  const [isRequestsLoading, setIsRequestsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    backend.getServiceRequests().then((data) => {
      data && setRequests(data);
      setIsLoading(false);
    });
  }, [backend]);

  const handleUpdateContact = () => {
    history.push(routeWithParams(Routes.CONTACT_FORM));
  };

  const handleRequestService = () => {
    history.push(routeWithParams(Routes.SERVICE_TYPE));
  };

  const onEditRequest = (request) => {
    switch (request.kind) {
      case RequestKinds.GROCERY:
        history.push(
          routeWithParams(Routes.SERVICE_GROCERIES_WHERE, { id: request.id }),
        );
        break;
      case RequestKinds.CHILDCARE:
        // TODO: route to childcare service
        break;
      case RequestKinds.MENTALHEALTH:
        // TODO: route to mental health service
        break;
      case RequestKinds.PETCARE:
        // TODO: route to petcare service
        break;
      default:
        return;
    }
  };

  const openConfirmDeleteRequestModal = (request) => {
    const selectedRequest = openRequests.find((req) => req.id === request.id);

    setRequestToBeDeleted(selectedRequest);

    setIsModalOpen(true);
  };

  const closeConfirmDeleteRequestModal = () => {
    setIsModalOpen(false);

    setRequestToBeDeleted(undefined);
  };

  const deleteRequest = () => {
    if (!requestToBeDeleted) {
      return;
    }

    backend.deleteRequest(requestToBeDeleted.id).then((data) => {
      setRequests(openRequests.filter((req) => req.id !== data));

      setIsModalOpen(false);

      setRequestToBeDeleted(undefined);
    });
  };

  return (
    <Page currentProgress={4} totalProgress={5}>
      {isLoading && <PageLoader />}
      {!isLoading && (
        <UserDashboard
          onEdit={onEditRequest}
          onDelete={openConfirmDeleteRequestModal}
          {...{
            isRequestsLoading,
            openRequests,
            handleUpdateContact,
            handleRequestService,
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

export default AdminDashboard;
