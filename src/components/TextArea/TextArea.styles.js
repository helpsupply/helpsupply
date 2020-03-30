import { css } from '@emotion/core';
import { Borders, Color, Radius, Space, visuallyHidden } from 'lib/theme';

const styles = {
  active: css({
    borderColor: Color.CORAL_30,
  }),
  activeLabel: css({
    ...visuallyHidden,
  }),
  textarea: css({
    appearance: 'none',
    background: 'transparent',
    border: `1.5px solid ${Color.GRAY_50}`,
    borderRadius: Radius.ROUNDED,
    display: 'block',
    height: '100%',
    fontSize: 16,
    padding: `${Space.S20}px`,
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
      /* Internet Explorer 10-11 */
      color: Color.GRAY_50,
    },
    '::-ms-input-placeholder': {
      /* Microsoft Edge */
      color: Color.GRAY_50,
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
    right: Space.S20,
    transition: '0.2s all ease-in-out',
  }),
  root: css({
    display: 'flex',
    border: Borders.TRANSPARENT,
    borderRadius: Radius.ROUNDED_WRAP,
    flexDirection: 'column',
    height: 240,
    margin: `0 0 ${Space.S30}px 0`,
    position: 'relative',
    width: '100%',
  }),
};

export default styles;
