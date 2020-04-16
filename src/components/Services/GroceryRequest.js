/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { formatDate } from 'lib/utils/datetime';
import { URGENCY_KEYS, URGENCY_TEXT } from 'lib/constants/urgency';

import { SecondaryButton } from 'components/Button';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import Note from 'components/Note';

import { styles } from './Request.styles';
import moment from 'moment';

const matchUrgencyToText = (text) => {
  let t;
  Object.entries(URGENCY_KEYS).find(([k, v]) => {
    if (v === text) {
      console.log(URGENCY_TEXT[k]);
      t = URGENCY_TEXT[k];
    }
  });
  return t;
};

export const GroceryRequest = ({ id, onDelete, onEdit, request }) => {
  const { t } = useTranslation();
  return (
    <div css={styles.root}>
      <div css={styles.section}>
        <Note>
          {' '}
          {t('dropsite.openRequests.requestId')} #{request.id}
        </Note>
      </div>
      <Text as="p" type={TEXT_TYPE.BODY_1} css={styles.title}>
        {request.kind}
      </Text>
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
        {matchUrgencyToText(request.urgency)}
      </Text>
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
        {t('dashboard.openRequests.dateNeededLabel')}{' '}
        {formatDate(moment.unix(request.date.seconds))}
      </Text>
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
        {t('dashboard.openRequests.crossStreet')} {request.crossStreet}
      </Text>
      {request.recurring && (
        <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
          Recurring
        </Text>
      )}
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
        {t('dashboard.openRequests.dateNeededLabel')}{' '}
        {request.dietaryRestrictions}
      </Text>
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
        {request.groceryList}
      </Text>
      <Note css={styles.date}>{t('global.form.addedLabel')}</Note>
      <SecondaryButton onClick={onEdit}>
        <Text type={TEXT_TYPE.NOTE}>{t('global.form.editLabel')}</Text>
      </SecondaryButton>
      <SecondaryButton onClick={onDelete}>
        <Text type={TEXT_TYPE.NOTE}>{t('global.form.deleteLabel')}</Text>
      </SecondaryButton>
    </div>
  );
};

Request.propTypes = {
  date: PropTypes.string,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GroceryRequest;
