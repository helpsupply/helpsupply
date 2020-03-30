/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { Request } from 'components/Request';

import { styles } from './DropSiteAdmin.styles';

export const Requests = ({ requests }) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Text as="h4" type={TEXT_TYPE.HEADER_4}>
        Masks
      </Text>
      <Request css={styles.request} />
    </Fragment>
  );
};

export default Requests;
