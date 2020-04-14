import { css } from 'lib/utils/media-queries';
import { Color, Space } from 'lib/theme';

const styles = {
  root: css({
    backgroundColor: Color.PRIMARY,
    marginRight: [`${Space.S20}px`, '', 'auto'],
  }),
  anchor: css({
    color: Color.WHITE,
  }),
  text: css({
    color: [Color.WHITE, '', Color.WHITE],
    marginBottom: [`${Space.S20}px`, '', `${Space.S30}px`],
  }),
  title: css({
    color: [Color.WHITE, '', Color.WHITE],
    marginBottom: [`${Space.S20}px`, '', `${Space.S30}px`],
    marginTop: `${Space.S40}px`,
  }),
};

export default styles;
