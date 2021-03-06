/** @jsx jsx */
import { useEffect, useState, useContext } from 'react';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'lib/constants/routes';
import { routeWithParams } from 'lib/utils/routes';

import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';
import UserDashboard from 'components/Dashboard/UserDashboard';
import { ErrorContext } from 'state/ErrorProvider';

function AdminDashboard({ backend }) {
  const history = useHistory();

  const [contact, setContact] = useState(undefined);
  const [openRequests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    backend
      .getServiceRequests()
      .then((data) => {
        const filteredRequests = data?.filter((r) => r.status !== 'inprogress');
        data && setRequests(filteredRequests);
      })
      .then(() => {
        backend
          .getServiceUser()
          .then(({ data }) => {
            setContact(data);
          })
          .catch((e) => {
            setIsLoading(false);
            setError(e.message);
          });
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.message);
      });
  }, [setError, backend]);

  const handleUpdateContact = () => {
    history.push(routeWithParams(Routes.CONTACT_FORM));
  };

  const handleRequestService = () => {
    history.push(routeWithParams(Routes.SERVICE_TYPE));
  };

  return (
    <Page
      currentProgress={0}
      totalProgress={5}
      hasBackButton={false}
      noGutter={true}
    >
      {isLoading && <PageLoader />}
      {!isLoading && (
        <UserDashboard
          {...{
            contact,
            openRequests,
            handleUpdateContact,
            handleRequestService,
          }}
        />
      )}
    </Page>
  );
}

export default AdminDashboard;
