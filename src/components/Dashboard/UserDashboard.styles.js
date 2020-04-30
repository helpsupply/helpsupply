import { css } from 'lib/utils/media-queries';
import { Color, Space } from 'lib/theme';

export const styles = {
  button: css({
    margin: `${Space.S30}px 0 ${Space.S60}px`,
  }),
  contact: css({
    color: Color.GRAY_75,
    marginBottom: Space.S20,
    '> div': {
      marginBottom: Space.S5,
    },
  }),
  kind: css({
    textTransform: 'capitalize',
    marginBottom: Space.S20,
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
    padding: [
      `${Space.S30}px ${Space.S40}px ${Space.S30}px`,
      '',
      `${Space.S30}px 22% ${Space.S30}px `,
    ],
  }),
  contentContainer: css({
    padding: [`0 ${Space.S40}px ${Space.S10}px`, '', `0 22% ${Space.S10}px `],
  }),
  section: css({
    marginBottom: Space.S30,
  }),
};
