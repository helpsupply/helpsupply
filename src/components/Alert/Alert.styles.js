import { css } from '@emotion/core';
import { Radius, Space } from 'lib/theme';

const styles = {
  link: css({
    color: 'rgb(114, 28, 36)',
    ':hover': {
      color: 'rgb(114, 28, 36)',
    },
  }),
  logout: css({
    fontWeight: 'bold',
    textDecoration: 'underline',
  }),
  root: css({
    background: '#f8d7da',
    border: `1px solid #f5c6cb`,
    borderRadius: Radius.ROUNDED,
    color: '#721c24',
    padding: Space.S20,
  }),
};

export default styles;
