/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { mapServiceKindToTitle } from 'lib/theme/services';
import { capitalize } from 'lib/utils/strings';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import Note from 'components/Note';

import { styles } from './Request.styles';

export const ChildCareRequest = ({ request }) => {
  const { t } = useTranslation();
  return (
    <div css={styles.root}>
      <div css={styles.section}>
        <Note>
          {t('dashboard.openRequests.requestId')} #{request.id}
        </Note>
      </div>
      <Text as="p" type={TEXT_TYPE.BODY_1} css={styles.capitalize}>
        {mapServiceKindToTitle()[request.kind]}
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
      <div>
        {Object.values(request?.children || []).map((child, idx) => (
          <Fragment key={idx}>
            <Text as="p" type={TEXT_TYPE.NOTE} css={styles.text}>
              Child {idx + 1}: {capitalize(child.birthMonth)} {child.birthYear}
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
      </div>
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
  onDelete: PropTypes.func.isRequired,
};

export default ChildCareRequest;
