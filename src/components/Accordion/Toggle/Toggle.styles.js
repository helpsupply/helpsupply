import { css } from '@emotion/core';
import { buttonReset } from 'lib/theme';

export const styles = {
  root: css({
    ...buttonReset,
    all: 'inherit',
    display: 'flex',
  }),
  indicator: css({
    position: 'absolute',
    right: 0,
  }),
};
