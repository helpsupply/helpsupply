import { css } from '@emotion/core';

import { Space } from 'lib/theme';

const styles = {
  root: css({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  }),
  content: css({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: `0 ${Space.S40}px`,
  }),
};

export default styles;
