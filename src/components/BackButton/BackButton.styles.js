import { css } from 'lib/utils/media-queries';
import { Space, Color } from 'lib/theme';

const styles = {
  root: css({
    padding: [`${Space.S30}px 0`, '', ''],
    marginBottom: [0, 0, '70%'],
  }),
  backIcon: css({
    circle: {
      stroke: ['', '', Color.WHITE],
    },
    path: {
      fill: ['', '', Color.WHITE],
    },
  }),
};

export default styles;
