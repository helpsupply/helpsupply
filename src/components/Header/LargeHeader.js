/** @jsx jsx */
import { jsx } from '@emotion/core';

import Anchor from 'components/Anchor';

import { Color } from 'lib/theme';
import { Routes } from 'constants/Routes';
import { ReactComponent as Logo } from 'static/icons/logo.svg';

import styles from './LargeHeader.styles';

const LargeHeader = ({ isHome }) => (
  <div css={[styles.root, !isHome && styles.marginTop]}>
    <Anchor href={Routes.HOME}>
      <Logo fill={Color.WHITE} />
    </Anchor>
  </div>
);

export default LargeHeader;
