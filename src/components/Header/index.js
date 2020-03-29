/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { Routes } from 'lib/constants';

import { ReactComponent as LogoInline } from 'static/icons/logo-inline.svg';

import styles from './Header.styles';

const Header = ({ currentProgress, totalProgress }) => {
  const progressBarWidth = (currentProgress / totalProgress) * 100;
  const progressBarWidthStyle = css({ width: `${progressBarWidth}%` });

  return (
    <div css={styles.root}>
      <a href={Routes.HOME} css={styles.link}>
        <LogoInline />
      </a>
      <span css={[styles.progressBar, progressBarWidthStyle]} />
    </div>
  );
};

export default Header;
