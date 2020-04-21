/** @jsx jsx */
import { Fragment, useContext } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import { capitalize } from 'lib/utils/strings';

import Text from 'components/Text';
import Card from 'components/Card';

import { styles } from './ServiceReview.styles';
import { StateContext, actions } from 'state/StateProvider';

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
      {recurring && <Text as="p">{t('request.review.recurring')}</Text>}
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
          label={t('request.review.childcare.details')}
          details={childcareDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeDetails}
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

export default ChildcareServiceReview;
