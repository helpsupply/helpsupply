import { css, keyframes } from '@emotion/core';

import { Height, Color } from 'lib/theme';

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

const styles = {
  root: css({
    animation: `${spin} 0.6s linear infinite`,
    display: 'block',
    height: Height.LOADER,
    width: Height.LOADER,
  }),
  svg: css({
    color: Color.WHITE,
  }),
  svgPrimary: css({
    color: Color.PRIMARY,
  }),
};

export default styles;
