/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import IntroContent from 'components/IntroContent';
import ListLink from 'components/ListLink';
import Page from 'components/layouts/Page';

import { Breakpoints } from 'constants/Breakpoints';
import { Routes } from 'constants/Routes';
import { useMediaQuery } from 'hooks/useMediaQuery';

import { Color } from 'lib/theme';

const containerStyles = {
  background: Color.PRIMARY,
};

function EntryPortal() {
  const { t } = useTranslation();

  const { matchesBreakpoint } = useMediaQuery();
  const isDesktop =
    (`(min-width: ${Breakpoints.LARGE}px)`,
    matchesBreakpoint(Breakpoints.LARGE));

  return (
    <Page
      isHome
      hasBackButton={false}
      contentContainerStyles={containerStyles}
      rootContainerStyles={containerStyles}
    >
      <ListLink
        href={Routes.EMAIL_FORM}
        title={t('home.needServices.title')}
        text={t('home.needServices.description')}
      />
      {!isDesktop && <IntroContent />}
    </Page>
  );
}

export default EntryPortal;
