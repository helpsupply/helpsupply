/** @jsx jsx */
import { useEffect, useState, useContext } from 'react';
import { jsx } from '@emotion/core';
import { useHistory /*useParams*/ } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { Color } from 'lib/theme';

import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';
import UserDashboard from 'components/Dashboard/UserDashboard';
import { ErrorContext } from 'state/ErrorProvider';

const containerStyles = {
  background: Color.GRAY,
};

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
        data && setRequests(data);
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
    <Page currentProgress={0} totalProgress={5} hasBackButton={false}>
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
