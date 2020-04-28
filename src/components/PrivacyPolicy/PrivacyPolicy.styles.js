import { css } from '@emotion/core';
import { Color, Space } from 'lib/theme';

export const styles = {
  title: css({
    margin: `${Space.S20}px 0`,
    color: Color.GRAY,
  }),
  lastUpdated: css({
    marginBottom: Space.S40,
    color: Color.GRAY_50,
  }),
  content: css({
    marginBottom: Space.S20,
    color: Color.GRAY_75,
  }),
  contentTitle: css({
    color: Color.GRAY,
    fontWeight: 600,
  }),
};
