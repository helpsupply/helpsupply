/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import styles from './IntroContent.styles';
import { Color } from 'lib/theme';

import Anchor from 'components/Anchor';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { textStyles } from 'components/Text/Text.styles';

import { Routes } from 'constants/Routes';

const IntroContent = ({ isDesktop }) => {
  const { t } = useTranslation();

  return (
    <div css={styles.root}>
      <Text css={styles.title} as="h3" type={TEXT_TYPE.HEADER_4}>
        {t('home.intro.title')}
      </Text>
      <Text css={styles.text} as="p" type={TEXT_TYPE.BODY_2}>
        {t('home.intro.paragraph1')}
      </Text>
      <Anchor
        href={Routes.FAQ}
        iconColor={isDesktop ? Color.WHITE : Color.CORAL}
        withIcon
      >
        <Text css={[styles.anchor, textStyles.BOLD]} type={TEXT_TYPE.BODY_2}>
          {t('home.intro.learnMore')}
        </Text>
      </Anchor>
    </div>
  );
};

export default IntroContent;
