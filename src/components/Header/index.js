/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import Anchor from 'components/Anchor';

import { Routes } from 'lib/constants/routes';
import { ReactComponent as LogoInline } from 'static/icons/logo-inline.svg';

import styles from './Header.styles';

const getProgressBarWidth = (
  currentProgress,
  totalProgress,
  isDesktop = false,
) => {
  return (currentProgress / totalProgress) * (isDesktop ? 50 : 100);
};

const getProgressBarWidthStyle = (progressBarWidth) => {
  return css({ width: `${progressBarWidth}%` });
};

export const ProgressBar = ({ currentProgress, isDesktop, totalProgress }) => {
  return (
    <span
      css={[
        styles.progressBar,
        getProgressBarWidthStyle(
          getProgressBarWidth(currentProgress, totalProgress, isDesktop),
        ),
        isDesktop && styles.progressBarDesktop,
      ]}
    />
  );
};

const Header = ({ currentProgress, totalProgress }) => {
  return (
    <div css={styles.root}>
      <Anchor href={Routes.HOME} css={styles.link}>
        <LogoInline />
      </Anchor>
      <ProgressBar
        currentProgress={currentProgress}
        totalProgress={totalProgress}
      />
    </div>
  );
};

export default Header;
