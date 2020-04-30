/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import Text from 'components/Text';
import SubRow from 'components/Confirmation/SubRow';
import { TEXT_TYPE } from 'components/Text/constants';

import { styles } from './ServiceReview.styles';

export const PetcareServiceReview = ({ id, service }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const { kind, urgency } = service;

  const handleChangeService = () => {
    history.push(
      routeWithParams(Routes.SERVICE_TYPE, {
        id,
      }),
    );
  };

  const serviceDetails = (
    <Fragment>
      <Text type={TEXT_TYPE.BODY_3} as="p" css={styles.capitalize}>
        {kind}
      </Text>
      <Text type={TEXT_TYPE.BODY_3} as="p" css={styles.capitalize}>
        {urgency}
      </Text>
    </Fragment>
  );

  return (
    <Fragment>
      <div css={styles.card}>
        <SubRow
          label={t('request.review.serviceType')}
          details={serviceDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeService}
        />
      </div>
    </Fragment>
  );
};

export default PetcareServiceReview;
