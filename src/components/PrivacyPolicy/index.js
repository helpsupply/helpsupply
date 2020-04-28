/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

import { styles } from './PrivacyPolicy.styles';

export const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Text css={styles.title} type={TEXT_TYPE.CONTENT_HEADER}>
        {t('privacy.title')}
      </Text>
      <Text css={styles.lastUpdated} type={TEXT_TYPE.BODY_2}>
        {t('privacy.lastUpdated')}
      </Text>
      <Text css={styles.content} type={TEXT_TYPE.BODY_2}>
        {t('privacy.description')}
      </Text>
      <Text css={styles.title} type={TEXT_TYPE.HEADER_5}>
        {t('privacy.generalInformation.title')}
      </Text>
      <Text css={styles.content} type={TEXT_TYPE.BODY_2}>
        {t('privacy.generalInformation.description')}
      </Text>
      <Text as="div" css={styles.content} type={TEXT_TYPE.BODY_2}>
        <Text type={TEXT_TYPE.BODY_2} css={styles.contentTitle}>
          {t('privacy.generalInformation.zipCode.title')}
        </Text>{' '}
        {t('privacy.generalInformation.zipCode.description')}
      </Text>
      <Text as="div" css={styles.content} type={TEXT_TYPE.BODY_2}>
        <Text type={TEXT_TYPE.BODY_2} css={styles.contentTitle}>
          {t('privacy.generalInformation.emailAddress.title')}
        </Text>{' '}
        {t('privacy.generalInformation.emailAddress.description')}
      </Text>
      <Text as="div" css={styles.content} type={TEXT_TYPE.BODY_2}>
        <Text type={TEXT_TYPE.BODY_2} css={styles.contentTitle}>
          {t('privacy.generalInformation.anythingElse.title')}
        </Text>{' '}
        {t('privacy.generalInformation.anythingElse.description')}
      </Text>
      <Text css={styles.title} type={TEXT_TYPE.HEADER_5}>
        {t('privacy.grocery.title')}
      </Text>
      <Text css={styles.content} type={TEXT_TYPE.BODY_2}>
        {t('privacy.grocery.description')}
      </Text>
      <Text as="div" css={styles.content} type={TEXT_TYPE.BODY_2}>
        <Text type={TEXT_TYPE.BODY_2} css={styles.contentTitle}>
          {t('privacy.grocery.neighborhood.title')}
        </Text>{' '}
        {t('privacy.grocery.neighborhood.description')}
      </Text>
      <Text as="div" css={styles.content} type={TEXT_TYPE.BODY_2}>
        <Text type={TEXT_TYPE.BODY_2} css={styles.contentTitle}>
          {t('privacy.grocery.additionalContact.title')}
        </Text>{' '}
        {t('privacy.grocery.additionalContact.description')}
      </Text>
      <Text css={styles.title} type={TEXT_TYPE.HEADER_5}>
        {t('privacy.childcare.title')}
      </Text>
      <Text css={styles.content} type={TEXT_TYPE.BODY_2}>
        {t('privacy.childcare.description')}
      </Text>
      <Text as="div" css={styles.content} type={TEXT_TYPE.BODY_2}>
        <Text type={TEXT_TYPE.BODY_2} css={styles.contentTitle}>
          {t('privacy.childcare.neighborhood.title')}
        </Text>{' '}
        {t('privacy.childcare.neighborhood.description')}
      </Text>
      <Text as="div" css={styles.content} type={TEXT_TYPE.BODY_2}>
        <Text type={TEXT_TYPE.BODY_2} css={styles.contentTitle}>
          {t('privacy.childcare.details.title')}
        </Text>{' '}
        {t('privacy.childcare.details.description')}
      </Text>
      <Text css={styles.title} type={TEXT_TYPE.HEADER_5}>
        {t('privacy.informationSecurity.title')}
      </Text>
      <Text css={styles.content} type={TEXT_TYPE.BODY_2}>
        {t('privacy.informationSecurity.paragraph1')}
      </Text>
      <Text css={styles.content} type={TEXT_TYPE.BODY_2}>
        {t('privacy.informationSecurity.paragraph2')}
      </Text>
    </Fragment>
  );
};

export default PrivacyPolicy;
