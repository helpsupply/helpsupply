import { css } from 'lib/utils/media-queries';
import { Color, Radius, Space } from 'lib/theme';

const styles = {
  root: css({
    background: Color.WHITE,
    borderRadius: Radius.ROUNDED,
    display: 'block',
    padding: Space.S30,
    textDecoration: 'none',
    width: '100%',

    '&:hover': {
      textDecoration: 'none',
    },
  }),
  content: css({
    alignItems: 'center',
    color: Color.PRIMARY,
    display: 'flex',
    justifyContent: 'space-between',
  }),
};

export default styles;
