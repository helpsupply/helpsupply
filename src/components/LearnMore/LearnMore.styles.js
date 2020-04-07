import { css } from '@emotion/core';
import { Space } from 'lib/theme';

export const styles = {
  listItem: css({
    listStyle: 'none',
    marginLeft: `-${Space.S20}px`,
    marginRight: Space.S10,
    position: 'relative',
    '&:before': {
      content: '-',
      left: 2,
      position: 'absolute',
    },
  }),
  contact: css({
    marginTop: Space.S40,
  }),
  contactTitle: css({
    marginBottom: Space.S20,
  }),
};
