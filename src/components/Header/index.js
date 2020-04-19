/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import Anchor from 'components/Anchor';

import { Routes } from 'constants/Routes';
import { ReactComponent as LogoInline } from 'static/icons/logo-inline.svg';

import styles from './Header.styles';

const Header = ({ currentProgress, totalProgress }) => {
  const progressBarWidth = (currentProgress / totalProgress) * 100;
  const progressBarWidthStyle = css({ width: `${progressBarWidth}%` });

  return (
    <div css={styles.root}>
      <Anchor href={Routes.HOME} css={styles.link}>
        <LogoInline />
      </Anchor>
      <span css={[styles.progressBar, progressBarWidthStyle]} />
    </div>
  );
};

export default Header;
