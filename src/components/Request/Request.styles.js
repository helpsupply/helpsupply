import { css } from '@emotion/core';
import { Color, Space, Radius } from 'lib/theme';

export const styles = {
  amount: css({
    color: Color.CORAL,
    fontWeight: 500,
    paddingLeft: Space.S5,
  }),
  date: css({
    marginTop: Space.S20,
  }),
  section: css({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  requestName: css({
    marginBottom: Space.S20,
  }),
  root: css({
    background: Color.WHITE,
    borderRadius: Radius.ROUNDED,
    marginBottom: Space.S20,
    padding: Space.S20,
  }),
  progress: css({
    background: Color.CORAL,
    borderRadius: Radius.ROUNDED,
    height: Space.S10,
  }),
  progressBar: css({
    background: Color.GRAY_10,
    borderRadius: Radius.ROUNDED,
    height: Space.S10,
    width: '100%',
  }),
  progressInfo: css({
    marginBottom: Space.S10,
  }),
};
