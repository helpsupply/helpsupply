import { css } from 'lib/utils/media-queries';
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
    marginBottom: Space.S15,
  }),
  root: css({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingTop: [Space.S30, 0, 0],
    width: '100%',
  }),
  subtext: css({
    marginBottom: Space.S15,
  }),
};

export default styles;
