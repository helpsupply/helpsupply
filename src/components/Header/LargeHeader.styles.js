import { css } from 'lib/utils/media-queries';
import { Color, Space } from 'lib/theme';

const mobileMinHeight = '276px';

const styles = {
  root: css({
    alignItems: 'flex-end',
    backgroundColor: `${Color.PRIMARY}`,
    display: 'flex',
    minHeight: [mobileMinHeight, '', 'auto'],
    padding: [`${Space.S40}px`, '', 0],
    width: '100%',
  }),
};

export default styles;
