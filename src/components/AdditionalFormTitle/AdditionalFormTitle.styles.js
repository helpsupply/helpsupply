import { css } from '@emotion/core';
import { Borders, Color, Space } from 'lib/theme';

const styles = {
  bottomRule: css({
    borderTop: Borders.GRAY1,
    marginBottom: Space.S40,
    marginTop: Space.S40,
    width: '100%',
  }),
  description: css({
    color: Color.GRAY_75,
    display: 'block',
    marginTop: Space.S25,
  }),
  noBorder: css({
    borderTop: 'none',
    paddingTop: 0,
  }),
  root: css({
    borderTop: Borders.GRAY1,
    padding: `${Space.S30}px 0`,
    width: '100%',
  }),
  titleHolder: css({
    color: Color.GRAY,
    display: 'flex',
    justifyContent: 'space-between',
  }),
};

export default styles;
