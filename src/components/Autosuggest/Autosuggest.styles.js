import { css } from '@emotion/core';
import {
  Borders,
  Color,
  InputPaddingLeft,
  InputPaddingVariant,
  Radius,
  Space,
  Height,
} from 'lib/theme';

const styles = {
  active: css({
    borderColor: Color.SECONDARY,
  }),
  activeContainer: css({
    borderColor: Color.TERTIARY,
  }),
  activeLabel: css({
    fontSize: 12,
    paddingTop: Space.S5,
    transition: '0.2s all ease-in-out',
  }),
  container: css({
    border: Borders.GRAY,
    borderRadius: Radius.ROUNDED,
    color: Color.GRAY_50,
    fontSize: 16,
    height: Height.INPUT,
    paddingLeft: InputPaddingLeft,
    pointerEvents: 'none',
    position: 'absolute',
    transition: '0.2s all ease-in-out',
    width: '100%',
  }),
  label: css({
    color: Color.GRAY_50,
    fontSize: 16,
    height: '100%',
    paddingTop: Space.S20,
    pointerEvents: 'none',
    transition: '0.2s all ease-in-out',
  }),
  root: css({
    border: Borders.TRANSPARENT,
    borderRadius: Radius.ROUNDED_WRAP,
    display: 'flex',
    flexDirection: 'column',
    margin: `0 0 ${Space.S30}px 0`,
    position: 'relative',
    width: '100%',

    '.react-autosuggest__container': {
      height: Height.INPUT,
    },
    '.react-autosuggest__input': {
      appearance: 'none',
      background: 'transparent',
      border: 0,
      color: Color.GRAY,
      display: 'block',
      fontSize: 16,
      height: '100%',
      padding: InputPaddingVariant,
      width: '100%',

      ':focus': {
        // borderColor: Color.TERTIARY,
        outline: 'none',
      },
    },
    '.react-autosuggest__suggestions-container--open': {
      background: Color.WHITE,
      border: `1px solid ${Color.GRAY_10}`,
      borderRadius: Radius.ROUNDED,
      boxShadow: `0px 4px 4px ${Color.GRAY_10}`,
      color: Color.GRAY_75,
      marginTop: 2,
      position: 'absolute',
      width: '100%',
      zIndex: 1,
    },
    '.react-autosuggest__suggestion-match': {
      color: Color.GRAY,
    },
    '.react-autosuggest__suggestions-list': {
      listStyle: 'none',
      marginBottom: Space.S0,
      maxHeight: '250px',
      overflow: 'scroll',
      WebkitOverflowScrolling: 'touch',
      padding: `0 ${Space.S20}px`,

      '> li': {
        padding: `${Space.S25}px 0`,
        ':not(:last-of-type)': {
          borderBottom: `1px solid ${Color.GRAY_LIGHT}`,
        },
        '& > div': {
          cursor: 'pointer',
        },
      },
    },
  }),
};

export default styles;
