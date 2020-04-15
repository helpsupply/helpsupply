import { css } from '@emotion/core';
import { textStyles } from 'components/Text/Text.styles';
import { buttonReset, Color, Space } from 'lib/theme';

const styles = {
  closedButton: css([
    buttonReset,
    textStyles.BOLD,
    { color: Color.PRIMARY, display: 'flex', textAlign: 'left' },
  ]),
  icon: css({
    flexShrink: 0,
    marginRight: Space.S5,
    marginTop: '2px',
    '& circle': {
      stroke: Color.PRIMARY,
    },
    '& path': {
      fill: Color.PRIMARY,
    },
  }),
};

export default styles;
