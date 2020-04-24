/** @jsx jsx */
import { Fragment, useContext, useCallback, useEffect, useState } from 'react';
import { css, jsx } from '@emotion/core';
import { useLocation } from 'react-router-dom';

import { useMediaQuery } from 'hooks/useMediaQuery';
import { Breakpoints } from 'constants/Breakpoints';
import { ErrorContext } from 'state/ErrorProvider';

import BackButton from 'components/BackButton';
import Header from 'components/Header';
import Text from 'components/Text';
import LargeHeader from 'components/Header/LargeHeader';
import Intro from 'components/EntryContent/Intro';
import Error from 'components/Error/Error';

import { Routes } from 'constants/Routes';

import MetaData from './MetaData';
import styles from './Page.styles';

const PageContent = ({
  contentContainerStyles,
  children,
  hasBackButton,
  isDesktop,
  isHome,
  onBackButtonClick,
  topPadding,
}) => {
  const location = useLocation();
  const paddingStyles = topPadding > 0 && css({ paddingTop: topPadding });

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
      ]}
    >
      <div
        css={[
          styles.pageContent,
          !hasBackButton && !isHome && styles.pageContentExtraPadding,
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
        // window.removeEventListener('resize');
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

  const today = new Date();

  return (
    <Fragment>
      <MetaData />
      <div css={[styles.root, rootContainerStyles]}>
        {errorMsg && (
          <div css={styles.error}>
            <Error error={errorMsg} />
          </div>
        )}

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
            <div css={isDesktop && styles.headerContentDesktop} ref={headerRef}>
              {!isHome && hasBackButton && (
                <BackButton onClick={onBackButtonClick} />
              )}
              <LargeHeader isHome={isHome} hasBackButton={hasBackButton} />
              {isDesktop && isHome && (
                <Fragment>
                  <Intro />
                  <Text css={styles.copyright}>
                    &copy; {today.getFullYear()} Help Supply, LLC
                  </Text>
                </Fragment>
              )}
            </div>
          </div>
        )}

        <PageContent
          children={[
            <Fragment key="children">{children}</Fragment>,
            <Fragment key="copyright">
              {!isDesktop && isHome && (
                <Text css={styles.copyright}>
                  &copy; {today.getFullYear()} Help Supply, LLC
                </Text>
              )}
            </Fragment>,
          ]}
          error={errorMsg}
          contentContainerStyles={contentContainerStyles}
          hasBackButton={hasBackButton}
          isDesktop={isDesktop}
          isHome={isHome}
          onBackButtonClick={onBackButtonClick}
          topPadding={pageContentTopPadding}
        />
      </div>
    </Fragment>
  );
};

export default Page;
