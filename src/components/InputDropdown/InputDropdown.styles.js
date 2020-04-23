import { css } from '@emotion/core';
import { Borders, Color, selectReset, Radius, Space, Height } from 'lib/theme';

const activeLabel = {
  fontSize: 12,
  paddingTop: Space.S10,
};

const styles = {
  activeLabel: css(activeLabel),
  chevron: css({
    position: 'absolute',
    pointerEvents: 'none',
    right: Space.S25,
    top: Space.S25,
    transition: 'transform 0.2s ease-in-out',
  }),
  label: css({
    color: Color.GRAY_50,
    fontSize: 16,
    position: 'absolute',
    height: '100%',
    paddingTop: Space.S20,
    left: Space.S20,
    pointerEvents: 'none',
    transition: '0.2s all ease-in-out',
  }),
  error: css({
    color: Color.PRIMARY,
    position: 'absolute',
    top: Height.INPUT,
  }),
  optionLabel: css({
    color: Color.GRAY_50,
    paddingLeft: Space.S25,
    paddingTop: Space.S20,
    position: 'absolute',
  }),
  root: css({
    border: Borders.TRANSPARENT,
    borderRadius: Radius.ROUNDED_WRAP,
    display: 'flex',
    flexDirection: 'column',
    height: Height.INPUT,
    margin: `0 0 ${Space.S30}px 0`,
    position: 'relative',
    width: '100%',

    '&:focus-within': {
      borderColor: Color.SECONDARY,

      '& svg': {
        transform: 'rotate(180deg)',
      },

      '& div': activeLabel,
    },
  }),
  rootHalfWidth: css({
    width: 'calc(50% - 8px)',
  }),
  select: css({
    ...selectReset,
    border: Borders.GRAY,
    borderRadius: Radius.ROUNDED,
    height: '100%',
    padding: `${Space.S10}px ${Space.S50}px 0 ${Space.S20}px`,

    '&:focus': {
      borderColor: Color.TERTIARY,
    },
  }),
  selectDefaultState: css({
    color: 'transparent',
  }),
};

export default styles;
