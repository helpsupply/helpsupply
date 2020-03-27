import { css } from '@emotion/core';
import { Borders, Color, selectReset, Radius, Space } from 'lib/theme';

const styles = {
  chevron: css({
    position: 'absolute',
    right: Space.S25,
    top: Space.S25,
  }),

  placeholder: css({
    color: Color.GRAY_50,
    paddingLeft: Space.S25,
    paddingTop: Space.S20,
    position: 'absolute',
  }),

  root: css({
    border: Borders.TRANSPARENT,
    borderRadius: Radius.ROUNDED,
    display: 'flex',
    flexDirection: 'column',
    height: 65,
    position: 'relative',

    '&:focus-within svg': {
      transform: 'rotate(180deg)',
    },
  }),

  select: css({
    ...selectReset,
    border: Borders.GRAY,
    borderRadius: Radius.ROUNDED,
    height: '100%',
    padding: `0 ${Space.S20}px`,
  }),

  selectDefaultState: css({
    color: Color.GRAY_50,
  }),
};

export default styles;
