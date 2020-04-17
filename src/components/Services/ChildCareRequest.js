/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { SecondaryButton } from 'components/Button';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import Note from 'components/Note';

import { styles } from './Request.styles';
import { Fragment } from 'react';

export const ChildCareRequest = ({ onDelete, onEdit, request }) => {
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
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
        {[
          request.mondays && 'Mondays',
          request.tuesdays && 'Tuesdays',
          request.wednesdays && 'Wednesdays',
          request.thursdays && 'Thursdays',
          request.fridays && 'Fridays',
          request.saturdays && 'Saturdays',
          request.sundays && 'Sundays',
          request.varies && 'Days vary',
        ]
          .filter((day) => !!day)
          .join(', ')}
      </Text>
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
        {[
          request.mornings && 'Mornings',
          request.afternoons && 'Afternoons',
          request.evenings && 'Evenings',
          request.night && 'Night',
          request.timeVaries && 'Times vary',
        ]
          .filter((day) => !!day)
          .join(', ')}
      </Text>
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
        {Object.values(request?.children || []).map((child, idx) => (
          <Fragment>
            <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
              Child {idx + 1}: {child.birthMonth} {child.birthYear}
            </Text>
            <Text
              as="p"
              type={TEXT_TYPE.NOTE}
              css={[styles.text, styles.capitalize]}
            >
              {child.specialNeeds}
            </Text>
          </Fragment>
        ))}
      </Text>
      <Note css={styles.date}>{t('global.form.addedLabel')}</Note>
      <div css={styles.actions}>
        <SecondaryButton onClick={onEdit}>
          <Text type={TEXT_TYPE.NOTE}>{t('global.form.editLabel')}</Text>
        </SecondaryButton>
        <SecondaryButton onClick={onDelete}>
          <Text type={TEXT_TYPE.NOTE}>{t('global.form.deleteLabel')}</Text>
        </SecondaryButton>
      </div>
    </div>
  );
};

Request.propTypes = {
  date: PropTypes.string,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ChildCareRequest;
