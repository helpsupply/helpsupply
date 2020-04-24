import { css } from 'lib/utils/media-queries';
import { Space, Color } from 'lib/theme';

const styles = {
  root: css({
    position: ['', '', 'absolute'],
    top: ['', '', '40px'],
    padding: [`0 0 ${Space.S30}px`, null, '0px'],
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
