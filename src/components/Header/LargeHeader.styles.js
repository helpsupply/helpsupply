import { css } from '@emotion/core';
import { Color, Space } from 'lib/theme';

const styles = {
  root: css({
    alignItems: 'flex-end',
    backgroundColor: `${Color.CORAL}`,
    display: 'flex',
    minHeight: '276px',
    padding: `${Space.S40}px`,
    width: '100%',
  }),
};

export default styles;
