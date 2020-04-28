import { css } from 'lib/utils/media-queries';
import { Color, Space } from 'lib/theme';

const mobileMinHeight = '170px';

const styles = {
  alignTop: css({
    alignSelf: 'flex-start',
  }),
  root: css({
    alignItems: 'flex-end',
    backgroundColor: `${Color.PRIMARY}`,
    display: ['block', null, 'flex'],
    padding: [`${mobileMinHeight} ${Space.S40}px 0`, '', 0],
    width: '100%',
  }),
};

export default styles;
