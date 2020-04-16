import { css } from 'lib/utils/media-queries';
import { Borders, Color, Space } from 'lib/theme';

const styles = {
  root: css({
    backgroundColor: Color.PRIMARY,
    color: Color.WHITE,
  }),
  link: css({
    color: Color.WHITE,
    display: 'block',
    margin: `${Space.S40}px 0`,

    svg: {
      fill: Color.WHITE,
    },
    '&:hover': {
      color: Color.WHITE,
      textDecoration: 'none',
    },
  }),
  introContent: css({
    color: Color.WHITE,
    margin: `${Space.S40}px 0`,
  }),
  intro: css({
    borderBottom: Borders.WHITE,
    marginBottom: Space.S40,
  }),
  listItem: css({
    alignItems: 'center',
    display: 'flex',
    marginBottom: Space.S20,
  }),
  content: css({
    flexBasis: '95%',
    paddingLeft: Space.S20,
  }),
  number: css({
    alignItems: 'center',
    border: Borders.WHITE2,
    borderRadius: '50%',
    display: 'flex',
    fontWeight: 'bold',
    height: 30,
    justifyContent: 'center',
    width: 30,
  }),
};

export default styles;
