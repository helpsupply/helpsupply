import { css } from 'lib/utils/media-queries';
import { Color, Space } from 'lib/theme';

const styles = {
  root: css({
    marginRight: [`${Space.S20}px`, '', 'auto'],
  }),
  anchor: css({
    color: [Color.CORAL, '', Color.WHITE],
  }),
  text: css({
    color: [Color.GRAY_75, '', Color.WHITE],
    marginBottom: [`${Space.S20}px`, '', `${Space.S30}px`],
  }),
  title: css({
    color: [Color.GRAY, '', Color.WHITE],
    marginBottom: [`${Space.S20}px`, '', `${Space.S30}px`],
    marginTop: `${Space.S40}px`,
  }),
};

export default styles;
