/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { css } from 'lib/utils/media-queries';
import { Color, Space } from 'lib/theme';
import Anchor from 'components/Anchor';
import Box from 'components/Box';
import LargeHeader from 'components/Header/LargeHeader';
import ListLink from 'components/ListLink';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { textStyles } from 'components/Text/Text.styles';
import Routes from 'constants/routes';
import { useTranslation } from 'react-i18next';

const styles = {
  box: css({
    height: 'auto',
    paddingTop: 0,
  }),
  text: css({
    color: Color.GRAY_75,
  }),
  titleAndText: css({
    marginTop: `${Space.S50}px`,
    paddingRight: '20px',
  }),
  title: css({
    marginBottom: `${Space.S20}px`,
  }),
};

function EntryPortal() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <LargeHeader />
      <Box css={styles.box}>
        <ListLink
          href={Routes.REQUEST_SERVICES}
          title={t('home.needServices.title')}
          text={t('home.needServices.description')}
        />
        <ListLink
          href={Routes.REQUEST_SUPPLIES}
          title={t('home.needSupplies.title')}
          text={t('home.needSupplies.description')}
        />
        <div css={styles.titleAndText}>
          <Text css={styles.title} as="h3" type={TEXT_TYPE.HEADER_4}>
            {t('home.intro.title')}
          </Text>
          <Text css={styles.text} as="p" type={TEXT_TYPE.BODY_2}>
            {t('home.intro.paragraph1')}
          </Text>
          <Text css={styles.text} as="p" type={TEXT_TYPE.BODY_2}>
            {t('home.intro.paragraph2')}
          </Text>
        </div>
        <Anchor href={Routes.FAQ} withIcon>
          <Text css={textStyles.BOLD} type={TEXT_TYPE.BODY_2}>
            {t('home.intro.learnMore')}
          </Text>
        </Anchor>
      </Box>
    </Fragment>
  );
}

export default EntryPortal;
