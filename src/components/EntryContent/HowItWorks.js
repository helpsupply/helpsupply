/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { Routes } from 'lib/constants/routes';

import Text from 'components/Text';
import Anchor from 'components/Anchor';
import { TEXT_TYPE } from 'components/Text/constants';

import styles from './EntryContent.styles';

export const HowTitle = ({ ...rest }) => {
  const { t } = useTranslation();
  return (
    <Text css={styles.introContent} as="h3" type={TEXT_TYPE.HEADER_4} {...rest}>
      {t('home.howItWorks.title')}
    </Text>
  );
};

export const HowList = ({ howFaq = true, ...rest }) => {
  const { t } = useTranslation();
  return (
    <div {...rest}>
      <div css={styles.listItem}>
        <div css={styles.number}>
          <Text type={TEXT_TYPE.BODY_2}>1</Text>
        </div>
        <div css={styles.content}>
          <Text type={TEXT_TYPE.BODY_2}>{t('home.howItWorks.bullet1')}</Text>
        </div>
      </div>
      <div css={styles.listItem}>
        <div css={styles.number}>
          <Text type={TEXT_TYPE.BODY_2}>2</Text>
        </div>
        <div css={styles.content}>
          <Text type={TEXT_TYPE.BODY_2}>{t('home.howItWorks.bullet2')}</Text>
        </div>
      </div>
      <div css={styles.listItem}>
        <div css={styles.number}>
          <Text type={TEXT_TYPE.BODY_2}>3</Text>
        </div>
        <div css={styles.content}>
          <Text type={TEXT_TYPE.BODY_2}>{t('home.howItWorks.bullet3')}</Text>
        </div>
      </div>
      {howFaq && <HowFaq />}
    </div>
  );
};

export const HowFaq = () => {
  const { t } = useTranslation();
  return (
    <Anchor withIcon css={styles.link} href={Routes.FAQ}>
      <Text type={TEXT_TYPE.BODY_2}>{t('home.howItWorks.learnMore')}</Text>
    </Anchor>
  );
};

const HowItWorks = () => {
  return (
    <Fragment>
      <HowTitle />
      <HowList />
    </Fragment>
  );
};

export default HowItWorks;
