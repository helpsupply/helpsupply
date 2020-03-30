/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ReactComponent as LogoInline } from 'static/icons/logo-inline.svg';

import styles from './Header.styles';

const Header = () => (
  <div css={styles.root}>
    <a href="/" css={styles.link}>
      <LogoInline />
    </a>
  </div>
);

export default Header;
