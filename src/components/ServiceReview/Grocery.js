/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import Card from 'components/Card';
import { PrimaryButton } from 'components/Button';

import { styles } from './ServiceReview.styles';

export const GroceryServiceReview = ({ id, handleSubmit, service }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const {
    groceryList,
    recurring,
    time,
    neighborhood,
    crossStreet,
    dietaryRestrictions,
  } = service;

  // service todo: handle return to confirmation screen after editing
  const handleChangeLocation = () => {
    history.push(
      routeWithParams(Routes.SERVICE_GROCERIES_WHERE, {
        id,
      }),
    );
  };
  const handleChangeTime = () => {
    history.push(
      routeWithParams(Routes.SERVICE_GROCERIES_WHEN, {
        id,
      }),
    );
  };
  const handleChangeList = () => {
    history.push(
      routeWithParams(Routes.SERVICE_GROCERIES_WHAT, {
        id,
      }),
    );
  };

  const locationDetails = (
    <Fragment>
      <Text as="p" css={styles.capitalize}>
        {/* service todo: map value to neighborhood name + location */}
        {neighborhood}
      </Text>
      <Text as="p" css={styles.capitalize}>
        {crossStreet}
      </Text>
    </Fragment>
  );

  const timeDetails = (
    <Fragment>
      <Text as="p" css={styles.capitalize}>
        {time}
      </Text>
      {recurring && <Text as="p"> {t('request.review.recurring')}</Text>}
    </Fragment>
  );

  const listDetails = (
    <Fragment>
      <Text as="p" css={styles.capitalize}>
        {groceryList}
      </Text>
      <Text as="p">
        {t('request.review.grocery.diet')}: {dietaryRestrictions}
      </Text>
    </Fragment>
  );

  return (
    <Fragment>
      <Text as="h2" type={TEXT_TYPE.HEADER_3} css={styles.title}>
        {t('request.review.title')}
      </Text>
      <div css={styles.card}>
        <Card
          label={t('request.review.grocery.location')}
          details={locationDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeLocation}
        />
      </div>
      {/*  service todo: add delivery contact card */}
      {/*  service todo: add delivery date - currently an invalid date */}
      <div css={styles.card}>
        <Card
          label={t('request.review.grocery.time')}
          details={timeDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeTime}
        />
      </div>
      <div css={styles.card}>
        <Card
          label={t('request.review.grocery.list')}
          details={listDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeList}
        />
      </div>
      <Text css={styles.disclaimer} type={TEXT_TYPE.NOTE}>
        {t('request.review.disclaimer')}
      </Text>
      <PrimaryButton type="submit" onClick={handleSubmit}>
        <Text>{t('request.review.submit')}</Text>
      </PrimaryButton>
    </Fragment>
  );
};

export default GroceryServiceReview;
