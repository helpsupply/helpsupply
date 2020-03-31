import { css } from '@emotion/core';
import { Radius, Space } from 'lib/theme';
import { colors } from './constants';

const styles = {
  link: css({
    color: colors.RED_DARK,
    ':hover, :focus': {
      color: colors.RED_DARK,
    },
  }),
  logout: css({
    fontWeight: 'bold',
    textDecoration: 'underline',
  }),
  root: css({
    background: colors.RED_LIGHTEST,
    border: `1px solid ${colors.RED_LIGHTER}`,
    borderRadius: Radius.ROUNDED,
    color: colors.RED_DARK,
    padding: Space.S20,
  }),
};

export default styles;
