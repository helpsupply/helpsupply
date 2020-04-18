/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';

import Text from 'components/Text';
import Card from 'components/Card';

import { styles } from './ServiceReview.styles';

export const ChildcareServiceReview = ({ id, service }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const { kind, urgency } = service;

  const handleChangeService = () => {
    history.push(Routes.SERVICE_TYPE);
  };

  const serviceDetails = (
    <Fragment>
      <Text as="p" css={styles.capitalize}>
        {kind}
      </Text>
      <Text as="p" css={styles.capitalize}>
        {urgency}
      </Text>
    </Fragment>
  );

  return (
    <Fragment>
      <div css={styles.card}>
        <Card
          label={t('request.review.serviceType')}
          details={serviceDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeService}
        />
      </div>
    </Fragment>
  );
};

export default ChildcareServiceReview;