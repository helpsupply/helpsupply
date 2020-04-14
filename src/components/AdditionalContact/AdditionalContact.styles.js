import { css } from '@emotion/core';
import { textStyles } from 'components/Text/Text.styles';
import { Borders, buttonReset, Color, Space } from 'lib/theme';

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
  openContainer: css({
    borderTop: Borders.GRAY1,
    padding: `${Space.S30}px 0`,
    width: '100%',
  }),
};

export default styles;
