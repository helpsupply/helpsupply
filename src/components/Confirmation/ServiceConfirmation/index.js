/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Breakpoints } from 'lib/constants/breakpoints';
import OrganizationIndex from 'lib/organizations/index';
import RequestKinds from 'lib/organizations/kinds';
import { Routes } from 'lib/constants/routes';

import { useMediaQuery } from 'hooks/useMediaQuery';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { LinkButton, PrimaryButton, SecondaryButton } from 'components/Button';

import ConfirmationWrapper from '../ConfirmationWrapper';
import OrganizationConfirmation from '../OrganizationConfirmation';
import styles from './ServiceConfirmation.styles';

export const ServiceConfirmation = ({ service }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { matchesBreakpoint } = useMediaQuery();
  const isDesktop =
    (`(min-width: ${Breakpoints.LARGE}px)`,
    matchesBreakpoint(Breakpoints.LARGE));
  const { kind } = service;

  const serviceToNameMap = {
    [RequestKinds.GROCERY]: 'groceries',
    [RequestKinds.MENTALHEALTH]: 'emotional support',
    [RequestKinds.CHILDCARE]: 'childcare',
  };

  const metadata = OrganizationIndex.Metadata[service.organization];
  const organization = { name: metadata.Organization };
  if (metadata.Email) {
    organization.email = metadata.Email;
  }
  if (metadata.Website) {
    organization.website = metadata.Website;
  }

  const organizationName = organization.name;
  const serviceName = serviceToNameMap[kind];

  const handleViewRequests = () => {
    history.push(Routes.DASHBOARD);
  };

  const handleRequestServices = () => {
    history.push(Routes.SERVICE_TYPE);
  };

  const handleShare = () => {
    const url = 'https://help.supply/';
    if (navigator.share) {
      navigator
        .share({
          text: 'Help Supply',
          title: 'Help Supply',
          url: url,
        })
        .then(() => {
          console.warn('Thanks for sharing!');
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
      const url = 'https://help.supply/';
      navigator.clipboard
        .writeText(url)
        .then(() => {
          console.warn('Link copied to clipboard');
        })
        .catch((error) => console.log('Error copying link:', error));
    }
  };

  return (
    <ConfirmationWrapper
      title={t('service.confirmation.title', { serviceName })}
    >
      <Text as="p" type={TEXT_TYPE.BODY_2} css={styles.description}>
        {kind !== RequestKinds.CHILDCARE
          ? t('service.confirmation.description', { organizationName })
          : t('service.confirmation.childcareDescription', {
              organizationName,
            })}
      </Text>
      <OrganizationConfirmation organization={organization} />
      {!isDesktop && (navigator.share || navigator.clipboard) && (
        <div css={styles.shareLink}>
          <LinkButton css={styles.link} onClick={handleShare}>
            <Text type={TEXT_TYPE.BODY_1}>
              {t('service.confirmation.share')}
            </Text>
          </LinkButton>
        </div>
      )}
      <SecondaryButton
        type="submit"
        onClick={handleViewRequests}
        css={styles.secondaryButton}
      >
        <Text type={TEXT_TYPE.BODY_1}>
          {t('service.confirmation.viewRequests')}
        </Text>
      </SecondaryButton>
      <PrimaryButton
        type="submit"
        onClick={handleRequestServices}
        css={styles.primaryButton}
      >
        <Text type={TEXT_TYPE.BODY_1}>
          {t('service.confirmation.requestServices')}
        </Text>
      </PrimaryButton>
    </ConfirmationWrapper>
  );
};

export default ServiceConfirmation;
