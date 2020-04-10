import { css } from '@emotion/core';

import { Color, Space } from 'lib/theme';

const bottomBorderSize = 2;

const styles = {
  root: css({
    borderBottom: `${bottomBorderSize}px solid ${Color.GRAY_LIGHT}`,
    display: 'flex',
    padding: `${Space.S30}px ${Space.S40}px`,
    position: 'relative',
  }),

  link: css({
    display: 'block',

    '& svg': {
      fill: Color.PRIMARY,
    },
  }),

  progressBar: css({
    background: Color.PRIMARY,
    bottom: `-${bottomBorderSize}px`,
    content: '""',
    display: 'block',
    height: `${bottomBorderSize}px`,
    left: 0,
    position: 'absolute',
  }),
};

export default styles;
