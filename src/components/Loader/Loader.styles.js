import { css, keyframes } from '@emotion/core';

import { Height } from 'lib/theme';

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

const styles = {
  root: css({
    animation: `${spin} 0.6s linear infinite`,
    height: Height.LOADER,
    width: Height.LOADER,
  }),
};

export default styles;
