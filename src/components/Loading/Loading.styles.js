import { css, keyframes } from '@emotion/core';
import { Radius, Space } from 'lib/theme';
import { colors, loaderSize } from './constants';

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

const styles = {
  loader: css({
    width: loaderSize,
    height: loaderSize,
    border: `4px solid ${colors.YELLOW}`,
    borderRadius: '50%',
    borderTopColor: colors.YELLOW_DARK,
    borderRightColor: colors.YELLOW_DARK,
    animation: `${spin} 1s linear infinite`,
    marginRight: Space.S30,
  }),
  root: css({
    background: colors.YELLOW_LIGHTER,
    border: `1px solid ${colors.YELLOW_LIGHT}`,
    borderRadius: Radius.ROUNDED,
    color: colors.YELLOW_DARK,
    padding: Space.S20,
    display: 'flex',
    alignItems: 'center',
  }),
};

export default styles;
