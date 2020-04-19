/** @jsx jsx */
import { Fragment, useCallback, useState } from 'react';
import { css, jsx } from '@emotion/core';

import { useMediaQuery } from 'hooks/useMediaQuery';
import { Breakpoints } from 'constants/Breakpoints';

import BackButton from 'components/BackButton';
import Header from 'components/Header';
import Text from 'components/Text';
import LargeHeader from 'components/Header/LargeHeader';
import Intro from 'components/EntryContent/Intro';

import styles from './Page.styles';
import { useContext } from 'react';
import { ErrorContext } from 'state/ErrorProvider';

const PageContent = ({
  contentContainerStyles,
  children,
  error,
  hasBackButton,
  isDesktop,
  onBackButtonClick,
  topPadding,
}) => {
  const paddingStyles = topPadding > 0 && css({ paddingTop: topPadding });

  return (
    <div
      css={[
        styles.pageContentContainer,
        isDesktop && paddingStyles,
        contentContainerStyles,
      ]}
    >
      {error && error}
      <div css={styles.pageContent}>
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
  const [pageContentTopPadding, setPageContentTopPadding] = useState(0);
  const { matchesBreakpoint } = useMediaQuery();
  const { errorMsg } = useContext(ErrorContext);

  const isDesktop =
    (`(min-width: ${Breakpoints.LARGE}px)`,
    matchesBreakpoint(Breakpoints.LARGE));
  const willUseSmallHeader = !isHome && !isDesktop;

  const headerRef = useCallback((node) => {
    if (node) {
      setPageContentTopPadding(node.getBoundingClientRect().top);

      window.addEventListener('resize', () =>
        setPageContentTopPadding(node.getBoundingClientRect().top),
      );
    }
  }, []);

  const today = new Date();

  return (
    <div css={[styles.root, rootContainerStyles]}>
      {willUseSmallHeader && (
        <Header
          currentProgress={currentProgress}
          totalProgress={totalProgress}
        />
      )}

      {!willUseSmallHeader && (
        <div css={isDesktop && styles.headerContainerDesktop}>
          <div css={isDesktop && styles.headerContentDesktop} ref={headerRef}>
            {!isHome && hasBackButton && (
              <BackButton onClick={onBackButtonClick} />
            )}
            <LargeHeader />
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
        children={children}
        error={errorMsg}
        contentContainerStyles={contentContainerStyles}
        hasBackButton={hasBackButton}
        isDesktop={isDesktop}
        onBackButtonClick={onBackButtonClick}
        topPadding={pageContentTopPadding}
      />
    </div>
  );
};

export default Page;
