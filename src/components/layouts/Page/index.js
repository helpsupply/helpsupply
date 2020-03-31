/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';

import styles from './Page.styles';

import BackButton from 'components/BackButton';
import Header from 'components/Header';
import IntroContent from 'components/IntroContent';
import LargeHeader from 'components/Header/LargeHeader';

import { useMediaQuery } from 'hooks/useMediaQuery';
import { Breakpoints } from 'constants/Breakpoints';

const renderHeader = ({
  currentProgress,
  isDesktop,
  isHome,
  totalProgress,
}) => {
  if (isHome || isDesktop) {
    return (
      <div css={isDesktop && styles.leftContainerDesktop}>
        <div css={isDesktop && styles.headerContentDesktop}>
          <LargeHeader />
          {isDesktop && <IntroContent isDesktop />}
        </div>
      </div>
    );
  }
  return (
    <Header currentProgress={currentProgress} totalProgress={totalProgress} />
  );
};

const renderPageContent = ({
  children,
  hasBackButton,
  isDesktop,
  isHome,
  onBackButtonClick,
}) => (
  <div css={[styles.container, isDesktop && styles.rightContainerDesktop]}>
    <div css={styles.content}>
      {!isHome && hasBackButton && <BackButton onClick={onBackButtonClick} />}
      {children}
    </div>
  </div>
);

const Page = ({
  children,
  hasBackButton = true,
  isHome,
  onBackButtonClick,
  currentProgress,
  totalProgress,
}) => {
  const { matchesBreakpoint } = useMediaQuery();
  const isDesktop =
    (`(min-width: ${Breakpoints.LARGE}px)`,
    matchesBreakpoint(Breakpoints.LARGE));

  return (
    <div css={styles.root}>
      {renderHeader({ currentProgress, isDesktop, isHome, totalProgress })}
      {renderPageContent({
        children,
        hasBackButton,
        isDesktop,
        isHome,
        onBackButtonClick,
      })}
    </div>
  );
};

export default Page;
