/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import RequestKinds from 'lib/organizations/kinds';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

import { styles } from './ServicesList.styles';

const Groceries = ({ organization }) => {
  const { t } = useTranslation();
  return (
    <div css={styles.serviceItem}>
      <Text as="h3" type={TEXT_TYPE.HEADER_4}>
        {t('service.available.groceries')}
      </Text>
      <Text as="p" css={styles.serviceOrganization}>
        {t('service.available.providedBy')} {organization}
      </Text>
    </div>
  );
};

const Childcare = ({ organization }) => {
  const { t } = useTranslation();
  return (
    <div css={styles.serviceItem}>
      <Text as="h3" type={TEXT_TYPE.HEADER_4}>
        {t('service.available.childCare')}
      </Text>
      <Text as="p" css={styles.serviceOrganization}>
        {t('service.available.providedBy')} {organization}
      </Text>
    </div>
  );
};

const EmotionalSupport = ({ organization }) => {
  const { t } = useTranslation();
  return (
    <div css={styles.serviceItem}>
      <Text as="h3" type={TEXT_TYPE.HEADER_4}>
        {t('service.available.emotionalSupport')}
      </Text>
      <Text as="p" css={styles.serviceOrganization}>
        {t('service.available.providedBy')} {organization}
      </Text>
    </div>
  );
};

export const ServicesList = ({ services, backend }) => {
  const { t } = useTranslation();

  const nameForService = (svc) =>
    backend.getMetadataForProvider(svc).Organization;

  return (
    <Fragment>
      <Text as="h2" type={TEXT_TYPE.CONTENT_HEADER} css={styles.title}>
        {t('service.available.title')}
      </Text>
      {services?.map((svc) => {
        if (svc[0] === RequestKinds.GROCERY) {
          return (
            <Groceries
              key={RequestKinds.GROCERY}
              organization={nameForService(svc[1])}
            />
          );
        }
        if (svc[0] === RequestKinds.CHILDCARE) {
          return (
            <Childcare
              key={RequestKinds.CHILDCARE}
              organization={nameForService(svc[1])}
            />
          );
        }
        if (svc[0] === RequestKinds.MENTALHEALTH) {
          return (
            <EmotionalSupport
              key={RequestKinds.MENTALHEALTH}
              organization={nameForService(svc[1])}
            />
          );
        }
      })}
    </Fragment>
  );
};

export default ServicesList;
