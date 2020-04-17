/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { PrimaryButton } from 'components/Button';
import Anchor, { anchorTypes } from 'components/Anchor';

import ConfirmationWrapper from './ConfirmationWrapper';

import styles from './ServiceConfirmation.styles';

export const ServiceConfirmation = ({ service }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { kind, organization } = service;

  const handleViewRequests = () => {
    history.push(Routes.DASHBOARD);
  };

  return (
    <ConfirmationWrapper
      title={t('request.serviceConfirmation.title', { kind })}
    >
      <Text css={styles.description}>
        {t('request.serviceConfirmation.description', { organization })}
      </Text>
      <div css={styles.organization}>
        <Text type={TEXT_TYPE.NOTE}>
          {t('request.serviceConfirmation.fulfilledBy')}
        </Text>
        <Text as="p" css={styles.organizationName}>
          {organization}
        </Text>
        <Anchor as={anchorTypes.A}>
          <Text as="p" type={TEXT_TYPE.NOTE}>
            email
          </Text>
        </Anchor>
        <Anchor as={anchorTypes.A} isExternalLink>
          <Text as="p" type={TEXT_TYPE.NOTE}>
            website
          </Text>
        </Anchor>
      </div>
      <PrimaryButton
        type="submit"
        onClick={handleViewRequests}
        css={styles.button}
      >
        <Text type={TEXT_TYPE.BODY_1}>
          {t('request.serviceConfirmation.viewRequests')}
        </Text>
      </PrimaryButton>
    </ConfirmationWrapper>
  );
};

export default ServiceConfirmation;
