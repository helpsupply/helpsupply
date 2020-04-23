import { css } from '@emotion/core';
import { Color, Borders, Space } from 'lib/theme';

export const styles = {
  root: css({
    listStyle: 'none',
    margin: 0,
    padding: 0,
  }),
  head: css({
    color: Color.GRAY,
    position: 'relative',
    textAlign: 'left',
    width: '100%',
  }),
  indicator: css({
    position: 'absolute',
    right: 0,
  }),
  container: css({
    borderBottom: Borders.GRAY1,
    padding: `${Space.S25}px 0`,
  }),
  content: css({
    color: Color.GRAY_75,
    marginBottom: Space.S15,
    marginTop: Space.S40,
  }),
};
