import { css } from '@emotion/core';
import { Space, Color } from 'lib/theme';

export const styles = {
  title: css({
    color: Color.GRAY,
    marginBottom: `${Space.S40}px`,
  }),
  card: css({
    marginBottom: `${Space.S20}px`,
  }),
  disclaimer: css({
    color: Color.GRAY_75,
    marginBottom: `${Space.S40}px`,
  }),
  capitalize: css({
    ':first-letter': {
      textTransform: 'capitalize',
    },
  }),
  reviewButton: css({
    marginBottom: Space.S70,
  }),
};
