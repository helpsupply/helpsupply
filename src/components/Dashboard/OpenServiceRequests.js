/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';

import RequestKinds from 'lib/organizations/kinds';
import { mapServiceKindToTitle } from 'lib/theme/services';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import GroceryRequest from 'components/Services/GroceryRequest';
import ChildCareRequest from 'components/Services/ChildCareRequest';
import MentalHealthRequest from 'components/Services/MentalHealthRequest';

import { styles } from './UserDashboard.styles';

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
  [RequestKinds.MENTALHEALTH]: (
    <MentalHealthRequest css={styles.request} {...request} />
  ),
  [RequestKinds.CHILDCARE]: (
    <ChildCareRequest css={styles.request} {...request} />
  ),
});

export const OpenServiceRequests = ({ onDelete, onEdit, requests }) => {
  const groupedRequests = groupBy(requests, 'kind');
  return (
    <Fragment>
      {Object.entries(groupedRequests).map(([k, v]) => (
        <Fragment key={k}>
          <Text as="h4" type={TEXT_TYPE.HEADER_4} css={styles.kind}>
            {mapServiceKindToTitle()[k]}
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
