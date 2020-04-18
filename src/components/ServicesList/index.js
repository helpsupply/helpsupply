/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

import { styles } from './ServicesList.styles';

const Groceries = () => {
  const { t } = useTranslation();
  return (
    <div css={styles.serviceItem}>
      <Text as="h3" type={TEXT_TYPE.HEADER_4}>
        {t('service.available.groceries')}
      </Text>
      <Text as="p">{t('service.available.providedBy.mutualAid')}</Text>
    </div>
  );
};

const Childcare = () => {
  const { t } = useTranslation();
  return (
    <div css={styles.serviceItem}>
      <Text as="h3" type={TEXT_TYPE.HEADER_4}>
        {t('service.available.childCare')}
      </Text>
      <Text as="p">
        {t('service.available.providedBy.workersNeedChildcare')}
      </Text>
    </div>
  );
};

const EmotionalSupport = () => {
  const { t } = useTranslation();
  return (
    <div css={styles.serviceItem}>
      <Text as="h3" type={TEXT_TYPE.HEADER_4}>
        {t('service.available.emotionalSupport')}
      </Text>
      <Text as="p">{t('service.available.providedBy.nycCovid')}</Text>
    </div>
  );
};

export const ServicesList = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Text as="h2" type={TEXT_TYPE.HEADER_3} css={styles.title}>
        {t('service.available.title')}
      </Text>
      {/* service todo: only display services that are available */}
      <Groceries />
      <Childcare />
      <EmotionalSupport />
    </Fragment>
  );
};

export default ServicesList;
