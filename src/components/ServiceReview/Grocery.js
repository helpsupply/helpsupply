/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { formatServiceDate } from 'lib/utils/datetime';

import Text from 'components/Text';
import Card from 'components/Card';

import { styles } from './ServiceReview.styles';

export const GroceryServiceReview = ({ id, service }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const {
    contactPreference,
    crossStreet,
    date,
    dietaryRestrictions,
    email,
    firstName,
    groceryList,
    languagePreference,
    lastName,
    neighborhood,
    phone,
    recurring,
    relationship,
    time,
  } = service;

  const formattedDate = formatServiceDate(date.toDate());

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

  const contactDetails = (
    <Fragment>
      <Text as="p" css={styles.capitalize}>
        {firstName} {lastName}
      </Text>
      <Text as="p" css={styles.capitalize}>
        {relationship}
      </Text>
      <Text as="p" css={styles.capitalize}>
        {phone}
      </Text>
      <Text as="p">{email}</Text>
      <Text as="p" css={styles.capitalize}>
        {contactPreference} {t('request.review.preferred')}
      </Text>
      <Text as="p" css={styles.capitalize}>
        {languagePreference} {t('request.review.preferred')}
      </Text>
    </Fragment>
  );

  const timeDetails = (
    <Fragment>
      <Text as="p" css={styles.capitalize}>
        {formattedDate}
      </Text>
      <Text as="p" css={styles.capitalize}>
        {time}
      </Text>
      {recurring && <Text as="p">{t('request.review.recurring')}</Text>}
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
      <div css={styles.card}>
        <Card
          label={t('request.review.grocery.location')}
          details={locationDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeLocation}
        />
      </div>
      <div css={styles.card}>
        <Card
          label={t('request.review.grocery.contact')}
          details={contactDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeLocation}
        />
      </div>
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
    </Fragment>
  );
};

export default GroceryServiceReview;
