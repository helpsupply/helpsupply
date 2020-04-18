/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { URGENCY_KEYS, URGENCY_TEXT } from 'lib/constants/urgency';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import Note from 'components/Note';

import { styles } from './Request.styles';
import moment from 'moment';

const matchUrgencyToText = (text) => {
  let t;
  Object.entries(URGENCY_KEYS).find(([k, v]) => {
    if (v === text) {
      t = URGENCY_TEXT[k];
    }
    return null;
  });
  return t;
};

export const GroceryRequest = ({
  // onDelete,
  // onEdit,
  request,
}) => {
  const { t } = useTranslation();
  return (
    <div css={styles.root}>
      <div css={styles.section}>
        <Note>
          {' '}
          {t('dropsite.openRequests.requestId')} #{request.id}
        </Note>
      </div>
      <Text as="p" type={TEXT_TYPE.BODY_1} css={styles.capitalize}>
        {request.kind}
      </Text>
      {request.firstName && (
        <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
          {request.firstName} {request.lastName}
        </Text>
      )}
      {request.phone && (
        <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
          {request.phone}
        </Text>
      )}
      {request.email && (
        <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
          {request.email}
        </Text>
      )}
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
        {matchUrgencyToText(request.urgency)}
      </Text>
      {request.date?.seconds && (
        <Text
          as="p"
          type={TEXT_TYPE.NOTE}
          css={[styles.text, styles.capitalize]}
        >
          {moment.unix(request.date?.seconds).format('dddd, MMMM Do')}{' '}
          {request.time}
        </Text>
      )}
      {request.recurring && (
        <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
          Recurring
        </Text>
      )}
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
        {request.groceryList}
      </Text>
      <Text as="p" type={TEXT_TYPE.NOTE} css={[styles.text, styles.capitalize]}>
        {request.dietaryRestrictions}
      </Text>
      <Note css={styles.date}>
        {t('global.form.addedLabel')}{' '}
        {moment(request.timeCreated).format('MMM DD, h:mma')}
      </Note>
      {/* <div css={styles.actions}>
        <SecondaryButton onClick={onEdit}>
          <Text type={TEXT_TYPE.NOTE}>{t('global.form.editLabel')}</Text>
        </SecondaryButton>
        <SecondaryButton onClick={onDelete}>
          <Text type={TEXT_TYPE.NOTE}>{t('global.form.deleteLabel')}</Text>
        </SecondaryButton>
      </div> */}
    </div>
  );
};

Request.propTypes = {
  date: PropTypes.string,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GroceryRequest;
