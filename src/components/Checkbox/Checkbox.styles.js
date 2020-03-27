import { css } from '@emotion/core';
import { Color, Space } from 'lib/theme';

const styles = {
  icon: css({
    display: 'none',
  }),
  iconChecked: css({
    display: 'block',
  }),
  label: css({
    alignItems: 'flex-start',
    cursor: 'pointer',
    display: 'flex',
    userSelect: 'none',
  }),
  input: css({
    display: 'none',
  }),
  iconContainer: css({
    border: `1px solid ${Color.GRAY_30}`,
    borderRadius: 4,
    flex: '0 0 24px',
    height: 24,
    display: 'flex',
    marginRight: Space.S15,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  iconContainerChecked: css({
    backgroundColor: Color.CORAL,
    borderColor: Color.CORAL,
  }),
};

export default styles;
