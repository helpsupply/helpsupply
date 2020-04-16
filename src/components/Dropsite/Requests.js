/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { Request } from 'components/Request';

import { styles } from './DropSiteAdmin.styles';

const groupBy = (arr, key) => {
  return arr.reduce((acc, item) => {
    var group = item[key];
    acc[group] = acc[group] || [];
    acc[group].push(item);
    return acc;
  }, {});
};

export const Requests = ({ onDelete, requests }) => {
  const groupedRequests = groupBy(requests, 'requestType');
  return (
    <Fragment>
      {Object.entries(groupedRequests).map(([k, v]) => (
        <Fragment key={k}>
          <Text as="h4" type={TEXT_TYPE.HEADER_4}>
            {k}
          </Text>
          {v.map((request) => (
            <Request
              key={request.id}
              css={styles.request}
              onDelete={() => onDelete(request)}
              {...request}
            />
          ))}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Requests;
