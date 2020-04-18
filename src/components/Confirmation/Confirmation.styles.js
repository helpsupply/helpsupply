import { css } from '@emotion/core';
import { Color, Space } from 'lib/theme';

export const styles = {
  check: css({
    marginLeft: Space.S10,
    verticalAlign: 'baseline',
  }),
  header: css({
    alignItems: 'center',
    display: 'flex',
    color: Color.GRAY,
  }),
  title: css({
    marginBottom: 0,
  }),
  root: css({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  }),
  section: css({
    marginBottom: Space.S30,
  }),
  subtext: css({
    marginBottom: Space.S15,
  }),
};

export default styles;
