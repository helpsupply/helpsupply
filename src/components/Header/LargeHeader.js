/** @jsx jsx */
import { jsx } from '@emotion/core';

import Anchor from 'components/Anchor';

import { Color } from 'lib/theme';
import { Routes } from 'lib/constants/routes';
import { ReactComponent as Logo } from 'static/icons/logo.svg';

import styles from './LargeHeader.styles';

const LargeHeader = ({ hasBackButton }) => (
  <div css={[styles.root, !hasBackButton && styles.alignTop]}>
    <Anchor href={Routes.HOME}>
      <Logo fill={Color.WHITE} />
    </Anchor>
  </div>
);

export default LargeHeader;
