/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';

import RequestKinds from 'lib/organizations/kinds';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { Request } from 'components/Request';

import { styles } from './UserDashboard.styles';
import GroceryRequest from 'components/Services/GroceryRequest';

const groupBy = (arr, key) => {
  return arr.reduce((acc, item) => {
    var group = item[key];
    acc[group] = acc[group] || [];
    acc[group].push(item);
    return acc;
  }, {});
};

const mapServiceKindToCard = (request) => ({
  [RequestKinds.GROCERY]: <GroceryRequest css={styles.request} {...request} />,
  // TODO: create service request cards
  // we might not need separate requests for this but since they have different info
  // i'm not sure we will need to list it all or just the common fields
  [RequestKinds.MENTALHEALTH]: null,
  [RequestKinds.PETCARE]: null,
  [RequestKinds.CHILDCARE]: null,
});

export const OpenServiceRequests = ({ onDelete, onEdit, requests }) => {
  const groupedRequests = groupBy(requests, 'kind');
  return (
    <Fragment>
      {Object.entries(groupedRequests).map(([k, v]) => (
        <Fragment key={k}>
          <Text as="h4" type={TEXT_TYPE.HEADER_4} css={styles.kind}>
            {k}
          </Text>
          {v.map(
            (request) =>
              mapServiceKindToCard({
                onEdit: () => onEdit(request),
                onDelete: () => onDelete(request),
                key: request.id,
                request,
              })[request.kind],
          )}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default OpenServiceRequests;
