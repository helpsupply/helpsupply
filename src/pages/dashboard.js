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
        history.push(
          routeWithParams(Routes.SERVICE_CHILDCARE_WHERE, { id: request.id }),
        );
        break;
      case RequestKinds.MENTALHEALTH:
        history.push(
          routeWithParams(Routes.SERVICE_EMOTIONAL_WHEN, { id: request.id }),
        );
        break;
      case RequestKinds.PETCARE:
        history.push(
          routeWithParams(Routes.SERVICE_PETCARE_WHERE, { id: request.id }),
        );
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

    backend.deleteServiceRequest(requestToBeDeleted.id).then(() => {
      setRequests(
        openRequests.filter((req) => req.id !== requestToBeDeleted.id),
      );

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
        request={requestToBeDeleted}
      />
    </Page>
  );
}

export default AdminDashboard;
