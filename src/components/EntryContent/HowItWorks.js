/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes } from 'constants/Routes';

import Text from 'components/Text';
import Anchor from 'components/Anchor';
import { TEXT_TYPE } from 'components/Text/constants';

import styles from './EntryContent.styles';

const HowItWorks = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Text css={styles.introContent} as="h3" type={TEXT_TYPE.HEADER_4}>
        {t('home.howItWorks.title')}
      </Text>
      <div css={styles.listItem}>
        <div css={styles.number}>
          <Text type={TEXT_TYPE.BODY_2}>1</Text>
        </div>
        <div css={styles.content}>
          <Text>{t('home.howItWorks.bullet1')}</Text>
        </div>
      </div>
      <div css={styles.listItem}>
        <div css={styles.number}>
          <Text type={TEXT_TYPE.BODY_2}>2</Text>
        </div>
        <div css={styles.content}>
          <Text>{t('home.howItWorks.bullet2')}</Text>
        </div>
      </div>
      <div css={styles.listItem}>
        <div css={styles.number}>
          <Text type={TEXT_TYPE.BODY_2}>3</Text>
        </div>
        <div css={styles.content}>
          <Text>{t('home.howItWorks.bullet3')}</Text>
        </div>
      </div>
      <Anchor withIcon css={styles.link} href={Routes.FAQ}>
        {t('home.howItWorks.learnMore')}
      </Anchor>
    </Fragment>
  );
};

export default HowItWorks;
