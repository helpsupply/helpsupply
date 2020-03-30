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
  } else {
    return (
      <Header currentProgress={currentProgress} totalProgress={totalProgress} />
    );
  }
};

const renderPageContent = ({
  children,
  hasBackButton,
  isDesktop,
  isHome,
  onBackButtonClick,
}) => (
  <div css={isDesktop && styles.rightContainerDesktop}>
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
    <Fragment>
      {renderHeader({ currentProgress, isDesktop, isHome, totalProgress })}
      {renderPageContent({
        children,
        hasBackButton,
        isDesktop,
        isHome,
        onBackButtonClick,
      })}
    </Fragment>
  );
};

export default Page;
