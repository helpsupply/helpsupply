/** @jsx jsx */
import { Fragment, useContext, useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { formatServiceDate } from 'lib/utils/datetime';
import { LANGUAGES } from 'lib/constants/languages';

import Text from 'components/Text';
import Card from 'components/Card';

import { styles } from './ServiceReview.styles';
import { StateContext, actions } from 'state/StateProvider';

const getPretty = (constant, slug) => {
  const target = constant.filter((lang) => {
    return lang.value === slug;
  })[0];

  if (!target) {
    return false;
  }

  return target.label;
};

export const GroceryServiceReview = ({ id, service, serviceUser, user }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { setState } = useContext(StateContext);
  const [contact, setContact] = useState();
  const {
    crossStreet,
    date,
    dietaryRestrictions,
    groceryList,
    neighborhood,
    recurring,
    time,
  } = service;

  useEffect(() => {
    if (!service || !serviceUser || !user) {
      return;
    }
    let contact = {
      fullname: `${serviceUser.firstName} ${serviceUser.lastName}`,
      email: user.email,
      phone: serviceUser.phone,
      contactPreference: `${
        serviceUser.contactPreference === 'phone' ? 'Phone' : 'Email'
      } ${t('request.review.preferred')}`,
      languagePreference: `${getPretty(
        LANGUAGES,
        serviceUser.languagePreference,
      )} ${t('request.review.preferred')}`,
    };

    if (
      service.additionalContactContactPreference &&
      service.additionalContactFirstName &&
      service.additionalContactLastName
    ) {
      contact = {
        fullname: `${service.additionalContactFirstName} ${service.additionalContactLastName}`,
        relationship: service.additionalContactRelationship,
        email: service.additionalContactEmail,
        phone: service.additionalContactPhone,
        contactPreference: `${
          service.additionalContactContactPreference === 'phone'
            ? 'Phone'
            : 'Email'
        } ${t('request.review.preferred')}`,
        languagePreference: `${getPretty(
          LANGUAGES,
          service.additionalContactLanguagePreference,
        )} ${t('request.review.preferred')}`,
      };
    }

    setContact(contact);
  }, [setContact, service, serviceUser, t, user]);

  const formattedDate = formatServiceDate(date);

  const handleRedirectIntent = () => {
    const url = routeWithParams(Routes.SERVICE_REVIEW, { id });
    setState({ type: actions.EDIT_SERVICE_REDIRECT, editServiceUrl: url });
  };

  const handleChangeLocation = () => {
    handleRedirectIntent();
    history.push(
      routeWithParams(Routes.SERVICE_GROCERIES_WHERE, {
        id,
      }),
    );
  };
  const handleChangeTime = () => {
    handleRedirectIntent();
    history.push(
      routeWithParams(Routes.SERVICE_GROCERIES_WHEN, {
        id,
      }),
    );
  };
  const handleChangeList = () => {
    handleRedirectIntent();
    history.push(
      routeWithParams(Routes.SERVICE_GROCERIES_WHAT, {
        id,
      }),
    );
  };

  const locationDetails = (
    <Fragment>
      <Text as="p" css={styles.capitalize}>
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
        {contact?.fullname}
      </Text>
      <Text as="p" css={styles.capitalize}>
        {contact?.relationship}
      </Text>
      <Text as="p">{contact?.phone}</Text>
      <Text as="p">{contact?.email}</Text>
      <Text as="p" css={styles.capitalize}>
        {contact?.contactPreference}
      </Text>
      <Text as="p" css={styles.capitalize}>
        {contact?.languagePreference}
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
