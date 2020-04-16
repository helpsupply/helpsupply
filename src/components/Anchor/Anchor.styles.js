import { css } from '@emotion/core';
import { Space, Color } from 'lib/theme';

export const styles = {
  root: css({
    color: Color.PRIMARY,
    fontSize: 'inherit',
    textDecoration: 'none',
    ':hover': {
      color: Color.PRIMARY,
      textDecoration: 'underline',
    },
  }),
  chevron: css({
    transform: 'rotate(270deg)',
  }),
  externalLink: css({
    marginLeft: Space.S5,
  }),
};
