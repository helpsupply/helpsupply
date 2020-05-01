/** @jsx jsx */
import { Fragment, useContext, useCallback, useEffect, useState } from 'react';
import { css, jsx } from '@emotion/core';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useMediaQuery } from 'hooks/useMediaQuery';
import { Breakpoints } from 'constants/Breakpoints';
import { ErrorContext } from 'state/ErrorProvider';

import Anchor, { anchorTypes } from 'components/Anchor';
import BackButton from 'components/BackButton';
import Header, { ProgressBar } from 'components/Header';
import HomePage from 'components/HomePage';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import LargeHeader from 'components/Header/LargeHeader';
import Intro from 'components/EntryContent/Intro';
import Error from 'components/Error/Error';

import { Routes } from 'constants/Routes';

import MetaData from './MetaData';
import styles from './Page.styles';

export const CopyRight = () => {
  const today = new Date();
  const { t } = useTranslation();

  return (
    <Text css={styles.copyright} type={TEXT_TYPE.BODY_2}>
      &copy; {today.getFullYear()} Help Supply, LLC |{' '}
      <Anchor
        forceBlank={true}
        href={Routes.PRIVACY}
        as={anchorTypes.A}
        css={{ color: 'inherit', '&:hover': { color: 'inherit' } }}
      >
        {t('global.privacy.link')}
      </Anchor>
    </Text>
  );
};

export const ErrorMessage = () => {
  const { errorMsg } = useContext(ErrorContext);
  if (!errorMsg) {
    return null;
  }

  return (
    <div css={styles.error}>
      <Error error={errorMsg} />
    </div>
  );
};

const PageContent = ({
  contentContainerStyles,
  children,
  hasBackButton,
  isDesktop,
  isHome,
  noGutter,
  onBackButtonClick,
  topPadding,
}) => {
  const location = useLocation();
  const paddingStyles = topPadding > 0 && css({ paddingTop: topPadding });
  const isDashboard = location.pathname === Routes.DASHBOARD;

  useEffect(() => {
    // This prevents the page from scrolling down to where it was previously.
    if (window && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // This is needed if the user scrolls down during page load and you want to make sure the page is scrolled to the top once it's fully loaded. This has Cross-browser support.
    window && window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div
      css={[
        styles.pageContentContainer,
        isDesktop && paddingStyles,
        contentContainerStyles,
        isDesktop && isHome && styles.desktopHomePage,
      ]}
    >
      <div
        css={[
          !isDashboard && styles.pageContent,
          isDashboard && styles.dashboardPageContent,
          noGutter && styles.noGutter,
        ]}
      >
        {hasBackButton && !isDesktop && (
          <BackButton onClick={onBackButtonClick} />
        )}
        {children}
      </div>
    </div>
  );
};

const Page = ({
  children,
  contentContainerStyles,
  hasBackButton = true,
  isHome,
  noGutter,
  onBackButtonClick,
  currentProgress,
  rootContainerStyles,
  totalProgress,
}) => {
  const location = useLocation();
  const [pageContentTopPadding, setPageContentTopPadding] = useState(0);
  const { matchesBreakpoint } = useMediaQuery();
  const { errorMsg } = useContext(ErrorContext);

  const isDesktop =
    (`(min-width: ${Breakpoints.LARGE}px)`,
    matchesBreakpoint(Breakpoints.LARGE));
  const willUseSmallHeader = !isHome && !isDesktop;

  const headerRef = useCallback(
    (node) => {
      if (location.pathname !== Routes.HOME) {
        setPageContentTopPadding(0);
        return;
      }

      if (node) {
        setPageContentTopPadding(node.getBoundingClientRect().top);

        window.addEventListener('resize', () =>
          setPageContentTopPadding(node.getBoundingClientRect().top),
        );
      }
    },
    [location.pathname],
  );

  if (isHome && isDesktop) {
    return (
      <Fragment>
        <MetaData />
        <HomePage rootContainerStyles={rootContainerStyles} />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <MetaData />
      <div css={[styles.root, rootContainerStyles]}>
        <ErrorMessage />

        {willUseSmallHeader && (
          <Header
            currentProgress={currentProgress}
            totalProgress={totalProgress}
          />
        )}

        {!willUseSmallHeader && (
          <div
            css={[
              isDesktop && styles.headerContainerDesktop,
              !isHome && styles.headerContainerDesktopInnerPage,
            ]}
          >
            <ProgressBar
              currentProgress={currentProgress}
              isDesktop={isDesktop}
              totalProgress={totalProgress}
            />
            <div css={isDesktop && styles.headerContentDesktop} ref={headerRef}>
              {!isHome && hasBackButton && (
                <BackButton onClick={onBackButtonClick} />
              )}
              <LargeHeader isHome={isHome} hasBackButton={hasBackButton} />
              {isDesktop && isHome && (
                <Fragment>
                  <Intro />
                  <CopyRight />
                </Fragment>
              )}
            </div>
          </div>
        )}

        <PageContent
          children={[
            <Fragment key="children">{children}</Fragment>,
            <Fragment key="copyright">
              {!isDesktop && isHome && <CopyRight />}
            </Fragment>,
          ]}
          error={errorMsg}
          contentContainerStyles={contentContainerStyles}
          hasBackButton={hasBackButton}
          isDesktop={isDesktop}
          isHome={isHome}
          noGutter={noGutter}
          onBackButtonClick={onBackButtonClick}
          topPadding={pageContentTopPadding}
        />
      </div>
    </Fragment>
  );
};

export default Page;
