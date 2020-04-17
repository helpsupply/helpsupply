/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import RequestKinds from 'lib/organizations/kinds';

import GroceryServiceReview from 'components/ServiceReview/Grocery';

function ServiceReview({ id, service }) {
  const history = useHistory();

  const handleSubmit = () => {
    history.push(
      routeWithParams(Routes.SERVICE_CONFIRMATION, {
        id,
      }),
    );
  };

  return (
    <Fragment>
      {service.kind === RequestKinds.GROCERY && (
        <GroceryServiceReview
          id={id}
          service={service}
          handleSubmit={handleSubmit}
        />
      )}
    </Fragment>
  );
}

export default ServiceReview;
