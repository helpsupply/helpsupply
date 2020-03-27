import { css } from '@emotion/core';
import { Color, Space } from 'lib/theme';

const styles = {
  root: css({
    padding: `${Space.S40}px 0`,
    width: '100%',
  }),
  anchor: css({
    ':hover': {
      textDecoration: 'none',
    },
  }),
  borderBottom: css({
    borderBottom: `1px solid ${Color.GRAY_25}`,
  }),
  text: css({
    color: Color.GRAY_75,
  }),
  titleWithIcon: css({
    alignItems: 'center',
    color: `${Color.GRAY}`,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: `${Space.S5}px`,
  }),
};

export default styles;
