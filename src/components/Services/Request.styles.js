import { css } from '@emotion/core';
import { Color, Space, Radius } from 'lib/theme';

export const styles = {
  actions: css({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    '> button': {
      ':first-of-type': {
        marginRight: Space.S15,
      },
      height: 50,
      width: '50%',
    },
  }),
  amount: css({
    color: Color.PRIMARY,
    fontWeight: 500,
    paddingLeft: Space.S5,
  }),
  date: css({
    marginTop: Space.S20,
    marginBottom: Space.S10,
  }),
  description: css({
    color: Color.GRAY,
    marginTop: Space.S10,
  }),
  section: css({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  requestName: css({
    marginBottom: Space.S20,
  }),
  root: css({
    color: Color.GRAY,
    background: Color.WHITE,
    border: Color.GRAY_10,
    borderRadius: Radius.ROUNDED,
    boxShadow: '0px 2px 2px rgba(72, 72, 72, 0.1)',
    marginBottom: Space.S30,
    padding: Space.S20,
  }),
  text: css({
    color: Color.GRAY_75,
    marginBottom: 0,
  }),
  capitalize: css({
    textTransform: 'capitalize',
  }),
};
