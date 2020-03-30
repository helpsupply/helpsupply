import { css } from '@emotion/core';
import { Color, Space } from 'lib/theme';

const styles = {
  root: css({
    color: Color.GRAY,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: `${Space.S30}px ${Space.S40}px`,
  }),
};

export default styles;
