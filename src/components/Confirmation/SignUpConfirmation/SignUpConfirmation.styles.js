import { css } from 'lib/utils/media-queries';
import { Color } from 'lib/theme';

export const styles = {
  description: css({
    color: Color.GRAY_75,

    strong: {
      color: Color.PRIMARY,
      fontWeight: 'normal',
      textTransform: 'lowercase',
    },
  }),
};

export default styles;
