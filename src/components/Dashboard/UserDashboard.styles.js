import { css } from '@emotion/core';
import { Color, Space } from 'lib/theme';

export const styles = {
  button: css({
    margin: `${Space.S30}px 0`,
  }),
  kind: css({
    textTransform: 'capitalize',
    marginBottom: Space.S20,
  }),
  footer: css({
    marginTop: Space.S30,
  }),
  loader: css({
    margin: 'auto',
  }),
  name: css({
    color: Color.GRAY,
  }),
  number: css({
    fontWeight: 'normal',
    marginLeft: Space.S10,
  }),
  request: css({
    marginTop: Space.S30,
  }),
  requestsHeader: css({
    color: Color.PRIMARY,
    marginTop: Space.S10,
  }),
  requestsContainer: css({
    background: Color.GRAY_10,
    margin: `${Space.S30}px -${Space.S40}px 0`,
    padding: `${Space.S30}px ${Space.S40}px`,
  }),
  section: css({
    marginBottom: Space.S30,
  }),
};
