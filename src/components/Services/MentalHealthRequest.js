/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { URGENCY_KEYS, URGENCY_TEXT } from 'lib/constants/urgency';
import { mapServiceKindToTitle } from 'lib/theme/services';
import { mentalHealthOptions } from 'lib/constants/options';
import { capitalize } from 'lib/utils/strings';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import Note from 'components/Note';

import { styles } from './Request.styles';

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

export const MentalHealthRequest = ({ request }) => {
  const { t } = useTranslation();
  return (
    <div css={styles.root}>
      <div css={styles.section}>
        <Note>
          {t('dropsite.openRequests.requestId')} #{request.id}
        </Note>
      </div>
      <Text as="p" type={TEXT_TYPE.BODY_1} css={styles.capitalize}>
        {mapServiceKindToTitle()[request.kind]}
      </Text>
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
        {matchUrgencyToText(request.urgency)}
      </Text>
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
        <span css={styles.capitalize}>{request.date}</span> {request.time}{' '}
        {t('dashboard.preferred')}
      </Text>
      {request.recurring && (
        <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
          Recurring
        </Text>
      )}
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
        {capitalize(
          mentalHealthOptions.find((o) => o.value === request.type)?.label,
        )}
      </Text>
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
        {request.note}
      </Text>
      <Note css={styles.date}>
        {t('global.form.addedLabel')}{' '}
        {moment(request.timeCreated).format('MMM DD, h:mma')}
      </Note>
    </div>
  );
};

Request.propTypes = {
  date: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default MentalHealthRequest;
