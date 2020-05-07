/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Routes } from 'lib/constants/routes';
import { Space } from 'lib/theme';

import Page from 'components/layouts/Page';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { PrimaryButton } from 'components/Button';

const PADDING_TOP = 110;

const containerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  '> div': {
    padding: `${PADDING_TOP}px 0`,

    '> div': {
      height: '100%',
      justifyContent: 'space-between',
    },
  },
};

const contentContainerStyles = {
  padding: `${PADDING_TOP}px 0`,
};

const title = css({
  fontSize: 32,
  fontWeight: 600,
  letterSpacing: '-0.04em',
  lineHeight: '36px',
  marginBottom: Space.S15,
});

function NoMatch() {
  const history = useHistory();
  const { t } = useTranslation();

  const handleOnCtaClick = () => {
    history.push(Routes.HOME);
  };
  return (
    <Page
      hasBackButton={false}
      contentContainerStyles={contentContainerStyles}
      rootContainerStyles={containerStyles}
    >
      <div>
        <Text type={TEXT_TYPE.NOT_FOUND} css={title} as="h1">
          {t('404.title')}
        </Text>
        <Text type={TEXT_TYPE.BODY_2} as="p">
          {t('404.description')}
        </Text>
      </div>
      <PrimaryButton onClick={handleOnCtaClick}>
        <Text type={TEXT_TYPE.BODY_1}>{t('404.cta')}</Text>
      </PrimaryButton>
    </Page>
  );
}

export default NoMatch;
