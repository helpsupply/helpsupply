/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import { Routes } from 'constants/Routes';

import Text from 'components/Text';
import Anchor from 'components/Anchor';
import { TEXT_TYPE } from 'components/Text/constants';
import ListLink from 'components/ListLink';

import styles from './EntryContent.styles';

export const OpenRequests = () => {
  const { t } = useTranslation();
  return (
    <Anchor withIcon css={styles.link} href={Routes.LOGIN}>
      <Text type={TEXT_TYPE.BODY_2}>{t('home.openRequests')}</Text>
    </Anchor>
  );
};

const Intro = ({ headerMargin, openRequests = true }) => {
  const { t } = useTranslation();
  return (
    <div css={styles.intro}>
      <Text
        css={[styles.introContent, headerMargin]}
        as="h2"
        type={TEXT_TYPE.HEADER_4}
      >
        {t('home.intro')}
      </Text>
      <ListLink href={Routes.SERVICE_LOCATION} label={t('home.needHelp')} />
      {openRequests && <OpenRequests />}
    </div>
  );
};

export default Intro;
