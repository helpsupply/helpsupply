/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { formatDate } from 'lib/utils/datetime';
import { numberWithCommas } from 'lib/utils/number';

import { SecondaryButton } from 'components/Button';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import Note from 'components/Note';

import { styles } from './Request.styles';

export const Request = ({
  date,
  id,
  onDelete,
  requestDescription,
  requestQuantity,
  requestTitle,
}) => {
  const { t } = useTranslation();
  const numberRequest = +requestQuantity;
  return (
    <div css={styles.root}>
      <div css={styles.section}>
        <Note>
          {' '}
          {t('dropsite.openRequests.requestId')} #{id}
        </Note>
        <SecondaryButton onClick={onDelete}>
          <Text type={TEXT_TYPE.NOTE}>{t('generic.button.deleteLabel')}</Text>
        </SecondaryButton>
      </div>
      <div css={styles.requestTitle}>
        <Text>{requestTitle}</Text>{' '}
        <Text css={styles.amount}>{numberWithCommas(numberRequest)}</Text>
      </div>
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.description}>
        {requestDescription}
      </Text>
      <Note css={styles.date}>
        {t('generic.label.added')} {formatDate(date)}
      </Note>
    </div>
  );
};

Request.propTypes = {
  date: PropTypes.string,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  requestDescription: PropTypes.string,
  requestQuantity: PropTypes.string.isRequired,
  requestTitle: PropTypes.string.isRequired,
};

export default Request;
