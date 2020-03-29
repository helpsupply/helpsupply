/** @jsx jsx */
import { jsx } from '@emotion/core';
import styles from './FacilityConfirmation.styles.js';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { ReactComponent as Check } from 'static/icons/green-check.svg';

import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

function FacilityConfirmation({ name, address }) {
  const t = useTranslation();

  return (
    <Fragment>
      <div css={[styles.header, styles.section]}>
        <Text as="h3" type={TEXT_TYPE.HEADER_3} css={styles.title}>
          {t('request.facilityAdded.title')}
        </Text>
        <Check />
      </div>
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.subtext}>
        {t('request.facilityAdded.newFacility')}
      </Text>
      <Text as="p">{name}</Text>
      <Text as="p">{address}</Text>
    </Fragment>
  );
}

export default FacilityConfirmation;
