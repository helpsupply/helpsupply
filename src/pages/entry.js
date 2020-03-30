/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import IntroContent from 'components/IntroContent';
import ListLink from 'components/ListLink';
import Page from 'components/layouts/Page';

import { Breakpoints } from 'constants/Breakpoints';
import { Routes } from 'constants/Routes';
import { useMediaQuery } from 'hooks/useMediaQuery';

function EntryPortal() {
  const { t } = useTranslation();

  const { matchesBreakpoint } = useMediaQuery();
  const isDesktop =
    (`(min-width: ${Breakpoints.LARGE}px)`,
    matchesBreakpoint(Breakpoints.LARGE));

  return (
    <Page isHome>
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
      {!isDesktop && <IntroContent />}
    </Page>
  );
}

export default EntryPortal;
