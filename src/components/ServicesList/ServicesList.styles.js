import { css } from '@emotion/core';
import { Color, Space, Borders } from 'lib/theme';

export const styles = {
  title: css({
    color: Color.GRAY,
  }),
  serviceItem: css({
    borderBottom: Borders.GRAY1,
    color: Color.GRAY,
    padding: `${Space.S20}px 0`,

    '&:last-of-type': {
      border: 'none',
    },
  }),
};
