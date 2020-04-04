import { css } from '@emotion/core';
import { buttonReset, Color, Radius, Space } from 'lib/theme';
import { type } from './constants';

const innerBottomOffset = 2;

const styles = {
  inner: css({
    display: 'block',
    marginBottom: innerBottomOffset,
  }),
  root: css({
    ...buttonReset,
    borderRadius: Radius.ROUNDED,
  }),
  [type.PRIMARY]: css({
    border: `2px solid transparent`,
    color: Color.WHITE,
    height: 65,
    background: Color.PRIMARY,
    width: '100%',
    ':disabled': {
      background: Color.GRAY_LIGHT,
    },
  }),
  [type.LINK]: css({
    textDecoration: 'underline',
  }),
  [type.SECONDARY]: css({
    color: Color.PRIMARY,
    height: 30,
    padding: `0 ${Space.S10}px`,
    border: `2px solid ${Color.PRIMARY}`,
    ':disabled': {
      color: Color.GRAY_LIGHT,
      borderColor: Color.GRAY_LIGHT,
    },
  }),
  [type.OUTLINE]: css({
    background: 'transparent',
    border: `2px solid ${Color.PRIMARY}`,
    color: Color.PRIMARY,
    ':disabled': {
      color: Color.GRAY_LIGHT,
      borderColor: Color.GRAY_LIGHT,
    },
  }),
};

export default styles;
