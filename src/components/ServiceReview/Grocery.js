/** @jsx jsx */
import { Fragment, useContext, useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { StateContext, actions } from 'state/StateProvider';
import { Routes } from 'lib/constants/routes';
import { routeWithParams } from 'lib/utils/routes';
import { formatServiceDate } from 'lib/utils/datetime';
import { LANGUAGES } from 'lib/constants/languages';

import Text from 'components/Text';
import SubRow from 'components/SubRow';
import { TEXT_TYPE } from 'components/Text/constants';

import { styles } from './ServiceReview.styles';

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
    additionalInfo,
    crossStreet,
    date,
    dietaryRestrictions,
    groceryList,
    kind,
    neighborhood,
    needsFinances,
    payment,
    recurring,
    time,
    urgency,
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
      } ${t('review.preferred')}`,
      languagePreference: `${getPretty(
        LANGUAGES,
        serviceUser.languagePreference,
      )} ${t('review.preferred')}`,
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
        } ${t('review.preferred')}`,
        languagePreference: `${getPretty(
          LANGUAGES,
          service.additionalContactLanguagePreference,
        )} ${t('review.preferred')}`,
      };
    }

    setContact(contact);
  }, [setContact, service, serviceUser, t, user]);

  const formattedDate = formatServiceDate(date);

  const handleRedirectIntent = () => {
    const url = routeWithParams(Routes.SERVICE_REVIEW, { id });
    setState({ type: actions.EDIT_SERVICE_REDIRECT, editServiceUrl: url });
  };

  const handleChangePayment = () => {
    handleRedirectIntent();
    history.push(
      routeWithParams(Routes.SERVICE_PAYMENT, {
        id,
      }),
    );
  };

  const handleChangeService = () => {
    handleRedirectIntent();
    history.push(
      routeWithParams(Routes.SERVICE_TYPE, {
        id,
      }),
    );
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

  const handleChangeAdditionalInfo = () => {
    handleRedirectIntent();
    history.push(
      routeWithParams(Routes.SERVICE_ADDITIONAL_INFO, {
        id,
      }),
    );
  };

  const paymentDetails = (
    <Fragment>
      <Text type={TEXT_TYPE.BODY_3} as="p" css={styles.capitalize}>
        {payment}
      </Text>
      <Text type={TEXT_TYPE.BODY_3} as="p" css={styles.capitalize}>
        {needsFinances
          ? t('review.financialHelpNeeded')
          : t('review.financialHelpNotNeeded')}
      </Text>
    </Fragment>
  );

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
      <Text type={TEXT_TYPE.BODY_3} as="p" css={styles.capitalize}>
        {formattedDate}
      </Text>
      <Text type={TEXT_TYPE.BODY_3} as="p" css={styles.capitalize}>
        {time}
      </Text>
      {recurring && (
        <Text type={TEXT_TYPE.BODY_3} as="p">
          {t('review.recurring')}
        </Text>
      )}
    </Fragment>
  );

  const listDetails = (
    <Fragment>
      <Text type={TEXT_TYPE.BODY_3} as="p" css={styles.capitalize}>
        {groceryList}
      </Text>
      <Text type={TEXT_TYPE.BODY_3} as="p">
        {t('review.grocery.diet')}: {dietaryRestrictions}
      </Text>
    </Fragment>
  );

  const additionalDetails = (
    <Fragment>
      <Text type={TEXT_TYPE.BODY_3} as="p" css={styles.capitalize}>
        {additionalInfo || 'None'}
      </Text>
    </Fragment>
  );

  return (
    <Fragment>
      <div css={styles.card}>
        <SubRow
          label={t('review.paymentMethod')}
          details={paymentDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangePayment}
        />
      </div>
      <div css={styles.card}>
        <SubRow
          label={t('review.serviceType')}
          details={serviceDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeService}
        />
      </div>
      <div css={styles.card}>
        <SubRow
          label={t('review.grocery.location')}
          details={locationDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeLocation}
        />
      </div>
      <div css={styles.card}>
        <SubRow
          label={t('review.grocery.contact')}
          details={contactDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeLocation}
        />
      </div>
      <div css={styles.card}>
        <SubRow
          label={t('review.grocery.time')}
          details={timeDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeTime}
        />
      </div>
      <div css={styles.card}>
        <SubRow
          label={t('review.grocery.list')}
          details={listDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeList}
        />
      </div>
      <div css={styles.card}>
        <SubRow
          label={t('review.additionalInfo')}
          details={additionalDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeAdditionalInfo}
        />
      </div>
    </Fragment>
  );
};

export default GroceryServiceReview;
