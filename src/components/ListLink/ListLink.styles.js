import { css } from 'lib/utils/media-queries';
import { Borders, Color, Space } from 'lib/theme';

const styles = {
  root: css({
    backgroundColor: Color.PRIMARY,
    borderBottom: Borders.GRAY1,
    padding: `${Space.S40}px 0`,
    width: '100%',
    ':last-child': {
      borderBottom: ['', '', '0'],
    },
    ':hover': {
      textDecoration: 'none',
    },
  }),
  text: css({
    color: Color.WHITE,
  }),
  titleWithIcon: css({
    alignItems: 'center',
    color: Color.WHITE,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: Space.S5,
  }),
};

export default styles;
