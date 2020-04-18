/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { useMediaQuery } from 'hooks/useMediaQuery';
import { Routes } from 'constants/Routes';
import { Breakpoints } from 'constants/Breakpoints';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { LinkButton, PrimaryButton, SecondaryButton } from 'components/Button';

import ConfirmationWrapper from './ConfirmationWrapper';
import OrganizationConfirmation from './OrganizationConfirmation';
import styles from './ServiceConfirmation.styles';

export const ServiceConfirmation = ({ service }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { matchesBreakpoint } = useMediaQuery();
  const isDesktop =
    (`(min-width: ${Breakpoints.LARGE}px)`,
    matchesBreakpoint(Breakpoints.LARGE));
  const { kind, organization } = service;

  const handleViewRequests = () => {
    history.push(Routes.DASHBOARD);
  };

  const handleRequestServices = () => {
    history.push(Routes.SERVICE_TYPE);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Help Supply',
          url: 'https://help.supply/',
        })
        .then(() => {
          console.warn('Thanks for sharing!');
        })
        .catch(console.error);
    } else {
      const url = 'https://help.supply/';
      navigator.clipboard
        .writeText(url)
        .then(() => {
          console.warn('Link copied to clipboard');
        })
        .catch(console.error);
    }
  };

  return (
    <ConfirmationWrapper
      title={t('request.serviceConfirmation.title', { kind })}
    >
      <Text as="p" type={TEXT_TYPE.BODY_2} css={styles.description}>
        {t('request.serviceConfirmation.description', { organization })}
      </Text>
      {/* service todo: link up to real organization data */}
      <OrganizationConfirmation organization={organization} />
      {!isDesktop && (
        <div css={styles.shareLink}>
          <LinkButton css={styles.link} onClick={handleShare}>
            {t('request.serviceConfirmation.share')}
          </LinkButton>
        </div>
      )}
      <SecondaryButton
        type="submit"
        onClick={handleViewRequests}
        css={styles.secondaryButton}
      >
        {t('request.serviceConfirmation.viewRequests')}
      </SecondaryButton>
      <PrimaryButton
        type="submit"
        onClick={handleRequestServices}
        css={styles.primaryButton}
      >
        <Text type={TEXT_TYPE.BODY_1}>
          {t('request.serviceConfirmation.requestServices')}
        </Text>
      </PrimaryButton>
    </ConfirmationWrapper>
  );
};

export default ServiceConfirmation;
