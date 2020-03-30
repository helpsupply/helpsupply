import { css } from '@emotion/core';
import { Space } from 'lib/theme';

export const styles = {
  header: css({
    alignItems: 'center',
    display: 'flex',
  }),
  title: css({
    marginRight: Space.S10,
    marginBottom: 0,
  }),
  root: css({
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
