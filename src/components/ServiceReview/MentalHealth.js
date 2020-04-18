/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import Text from 'components/Text';
import Card from 'components/Card';

import { styles } from './ServiceReview.styles';

export const MentalHealthServiceReview = ({ id, service }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const {
    additionalInfo,
    type,
    kind,
    urgency,
    date,
    time,
    recurring,
  } = service;

  const handleChangeService = () => {
    history.push(Routes.SERVICE_TYPE);
  };

  const handleChangeTime = () => {
    history.push(
      routeWithParams(Routes.SERVICE_EMOTIONAL_WHEN, {
        id,
      }),
    );
  };

  const handleChangeSupport = () => {
    history.push(
      routeWithParams(Routes.SERVICE_EMOTIONAL_WHAT, {
        id,
      }),
    );
  };

  const handleChangeAdditionalInfo = () => {
    history.push(
      routeWithParams(Routes.SERVICE_ADDITIONAL_INFO, {
        id,
      }),
    );
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

  const timeDetails = (
    <Fragment>
      <Text as="p" css={styles.capitalize}>
        {date} {time}
      </Text>
      {recurring && <Text as="p">{t('request.review.recurring')}</Text>}
    </Fragment>
  );

  const supportDetails = (
    <Fragment>
      <Text as="p" css={styles.capitalize}>
        {type}
      </Text>
    </Fragment>
  );

  const additionalDetails = (
    <Fragment>
      <Text as="p" css={styles.capitalize}>
        {additionalInfo}
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
      <div css={styles.card}>
        <Card
          label={t('request.review.preferredTime')}
          details={timeDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeTime}
        />
      </div>
      <div css={styles.card}>
        <Card
          label={t('request.review.mentalHealth.supportDetails')}
          details={supportDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeSupport}
        />
      </div>
      <div css={styles.card}>
        <Card
          label={t('request.review.additionalInfo')}
          details={additionalDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeAdditionalInfo}
        />
      </div>
    </Fragment>
  );
};

export default MentalHealthServiceReview;
