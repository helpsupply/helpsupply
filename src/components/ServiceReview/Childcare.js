/** @jsx jsx */
import { Fragment, useContext } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { StateContext, actions } from 'state/StateProvider';
import { Routes } from 'lib/constants/routes';
import { routeWithParams } from 'lib/utils/routes';
import { capitalize } from 'lib/utils/strings';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import SubRow from 'components/SubRow';

import { styles } from './ServiceReview.styles';

export const ChildcareServiceReview = ({ id, service }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { setState } = useContext(StateContext);

  const {
    additionalInfo,
    afternoons,
    children,
    evenings,
    fridays,
    kind,
    mondays,
    mornings,
    night,
    needsFinances,
    payment,
    recurring,
    saturdays,
    sundays,
    thursdays,
    timeVaries,
    tuesdays,
    urgency,
    varies,
    wednesdays,
  } = service;

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

  const handleChangeTime = () => {
    handleRedirectIntent();
    history.push(
      routeWithParams(Routes.SERVICE_CHILDCARE_WHEN, {
        id,
      }),
    );
  };

  const handleChangeDetails = () => {
    handleRedirectIntent();
    history.push(
      routeWithParams(Routes.SERVICE_CHILDCARE_DETAILS, {
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
      <Text type={TEXT_TYPE.BODY_3} as="p" css={styles.capitalize}>
        {kind}
      </Text>
      <Text type={TEXT_TYPE.BODY_3} as="p" css={styles.capitalize}>
        {urgency}
      </Text>
    </Fragment>
  );

  const timeDetails = (
    <Fragment>
      <Text as="p">
        {[
          mondays && 'Mondays',
          tuesdays && 'Tuesdays',
          wednesdays && 'Wednesdays',
          thursdays && 'Thursdays',
          fridays && 'Fridays',
          saturdays && 'Saturdays',
          sundays && 'Sundays',
          varies && 'Days vary',
        ]
          .filter((day) => !!day)
          .join(', ')}
      </Text>
      <Text as="p">
        {[
          mornings && 'Mornings',
          afternoons && 'Afternoons',
          evenings && 'Evenings',
          night && 'Night',
          timeVaries && 'Times vary',
        ]
          .filter((day) => !!day)
          .join(', ')}
      </Text>
      {recurring && <Text as="p">{t('review.recurring')}</Text>}
    </Fragment>
  );

  const childcareDetails = (
    <Text as="div">
      {Object.values(children || []).map((child, idx) => (
        <div key={idx}>
          <Text key={idx} as="div">
            Child {idx + 1}: {capitalize(child.birthMonth)}, {child.birthYear}
          </Text>
          <Text as="p">{child.specialNeeds}</Text>
        </div>
      ))}
    </Text>
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
          label={t('review.preferredTime')}
          details={timeDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeTime}
        />
      </div>
      <div css={styles.card}>
        <SubRow
          label={t('review.childcare.details')}
          details={childcareDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeDetails}
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

export default ChildcareServiceReview;
