import { css } from '@emotion/core';
import { Borders, Color, Radius, Space, Height } from 'lib/theme';

const styles = {
  active: css({
    borderColor: Color.SECONDARY,
  }),
  activeLabel: css({
    fontSize: 12,
    paddingTop: Space.S10,
    transition: '0.2s all ease-in-out',
  }),
  container: css({
    display: 'flex',
    border: Borders.TRANSPARENT,
    borderRadius: Radius.ROUNDED_WRAP,
    flexDirection: 'column',
    height: Height.INPUT,
    margin: 0,
    width: '100%',
  }),
  error: css({
    color: Color.PRIMARY,
    position: 'absolute',
  }),
  input: css({
    appearance: 'none',
    background: 'transparent',
    border: Borders.GRAY2,
    borderRadius: Radius.ROUNDED,
    display: 'block',
    height: '100%',
    fontSize: 16,
    padding: `${Space.S10}px ${Space.S20}px 0 ${Space.S20}px`,
    width: '100%',

    ':focus': {
      outline: 'none',
    },

    '::placeholder': {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: Color.GRAY_50,
      opacity: 1 /* Firefox */,
    },
    ':-ms-input-placeholder': {
      /* Internet Explorer 10-11 */ color: Color.GRAY_50,
    },
    '::-ms-input-placeholder': {
      /* Microsoft Edge */ color: Color.GRAY_50,
    },
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
  root: css({
    margin: `0 0 ${Space.S30}px 0`,
    position: 'relative',
    width: '100%',
  }),
  rootHalfWidth: css({
    width: 'calc(50% - 8px)',
  }),
};

export default styles;
