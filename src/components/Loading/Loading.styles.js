import { css, keyframes } from '@emotion/core';
import { Radius, Space } from 'lib/theme';

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

const styles = {
  loader: css({
    width: 30,
    height: 30,
    border: '4px solid #ffeeba',
    borderRadius: '50%',
    borderTopColor: '#856404',
    borderRightColor: '#856404',
    animation: `${spin} 1s linear infinite`,
    marginRight: Space.S30,
  }),
  root: css({
    background: '#fff3cd',
    border: `1px solid #ffeeba`,
    borderRadius: Radius.ROUNDED,
    color: '#856404',
    padding: Space.S20,
    display: 'flex',
    alignItems: 'center',
  }),
};

export default styles;
