/** @jsx jsx */
import { Fragment, useContext } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { StateContext, actions } from 'state/StateProvider';
import { Routes } from 'constants/Routes';
import { Services } from 'lib/theme/services';
import { routeWithParams } from 'lib/utils/routes';
import { getPretty } from 'lib/utils/strings';
import { mentalHealthOptions } from 'lib/constants/options';

import SubRow from 'components/SubRow';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

import { styles } from './ServiceReview.styles';

export const MentalHealthServiceReview = ({ id, service }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { setState } = useContext(StateContext);
  const { additionalInfo, type, urgency, date, time, recurring } = service;

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
      routeWithParams(Routes.SERVICE_EMOTIONAL_WHEN, {
        id,
      }),
    );
  };

  const handleChangeSupport = () => {
    handleRedirectIntent();
    history.push(
      routeWithParams(Routes.SERVICE_EMOTIONAL_WHAT, {
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
      <Text type={TEXT_TYPE.BODY_3} as="p" css={styles.capitalize}>
        {Services.EMOTIONAL}
      </Text>
      <Text type={TEXT_TYPE.BODY_3} as="p" css={styles.capitalize}>
        {urgency}
      </Text>
    </Fragment>
  );

  const timeDetails = (
    <Fragment>
      <Text type={TEXT_TYPE.BODY_3} as="p" css={styles.capitalize}>
        {date} {time}
      </Text>
      {recurring && (
        <Text type={TEXT_TYPE.BODY_3} as="p">
          {t('review.recurring')}
        </Text>
      )}
    </Fragment>
  );

  const supportDetails = (
    <Fragment>
      <Text type={TEXT_TYPE.BODY_3} as="p" css={styles.capitalize}>
        {getPretty(mentalHealthOptions, type)}
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
          label={t('review.mentalHealth.supportDetails')}
          details={supportDetails}
          editLabel={t('global.form.changeLabel')}
          onClick={handleChangeSupport}
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

export default MentalHealthServiceReview;
