import { css } from '@emotion/core';
import { Color, Radius, Space } from 'lib/theme';

const styles = {
  active: css({
    borderColor: Color.CORAL_30,
  }),
  dropdown: css({
    appearance: 'none',
    backgroundColor: 'transparent',
    display: 'block',
    height: 65,
    width: '100%',
    outline: 'none',
    border: `1.5px solid ${Color.GRAY_50}`,
    borderRadius: Radius.ROUNDED,
    position: 'relative',

    '&::-ms-expand': {
      display: 'none',
    },
  }),
  chevron: css({
    position: 'absolute',
    right: Space.S25,
    top: Space.S25,
  }),
  chevronOpen: css({
    transform: 'rotate(180deg)',
  }),
  list: css({
    background: Color.WHITE,
    border: `1px solid ${Color.GRAY_10}`,
    borderRadius: Radius.ROUNDED,
    boxShadow: `0px 4px 4px ${Color.GRAY_10}`,
    listStyle: 'none',
    padding: `0 ${Space.S20}px`,
    position: 'absolute',
    top: 65,
    width: '100%',
    zIndex: 1,

    '> li': {
      padding: `${Space.S25}px 0`,
      ':not(:last-of-type)': {
        borderBottom: `1px solid ${Color.GRAY_LIGHT}`,
      },
    },
  }),
  option: css({
    cursor: 'pointer',
    ':hover': {},
  }),
  placeholder: css({
    color: Color.GRAY_50,
    paddingLeft: Space.S25,
    paddingTop: Space.S20,
    position: 'absolute',
  }),
  root: css({
    border: `2px solid transparent`,
    borderRadius: 11,
    display: 'flex',
    flexDirection: 'column',
    height: 65,
    position: 'relative',
  }),
  selected: css({
    color: Color.GRAY,
  }),
};

export default styles;
