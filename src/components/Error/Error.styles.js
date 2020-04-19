import { css } from '@emotion/core';
import { Space, Color } from 'lib/theme';

const ERROR_HEIGHT = 107;

const styles = {
  title: css({
    color: Color.ORANGE,
    fontWeight: 600,
  }),
  text: css({
    color: Color.ORANGE_75,
  }),
  root: css({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    background: Color.ORANGE_05,
    padding: `${Space.S30}px ${Space.S40}px`,
    height: ERROR_HEIGHT,
  }),
};

export default styles;
