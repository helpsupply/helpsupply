/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import { Routes } from 'constants/Routes';

import Text from 'components/Text';
import Anchor from 'components/Anchor';
import { TEXT_TYPE } from 'components/Text/constants';
import ListLink from 'components/ListLink';

import styles from './EntryContent.styles';

const Intro = () => {
  const { t } = useTranslation();
  return (
    <div css={styles.intro}>
      <Text css={styles.introContent} as="h2" type={TEXT_TYPE.HEADER_3}>
        {t('home.intro')}
      </Text>
      <ListLink href={Routes.SERVICE_LOCATION} label={t('home.needHelp')} />
      <Anchor withIcon css={styles.link} href={Routes.LOGIN}>
        {t('home.openRequests')}
      </Anchor>
    </div>
  );
};

export default Intro;
