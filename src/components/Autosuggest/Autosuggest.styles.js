import { css } from '@emotion/core';
import { Borders, Color, Radius, Space, Height } from 'lib/theme';

const styles = {
  active: css({
    borderColor: Color.CORAL_30,
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
    paddingLeft: Space.S20,
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
    borderRadius: Radius.ROUNDED,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',

    '.react-autosuggest__container': {
      height: Height.INPUT,
    },
    '.react-autosuggest__input': {
      appearance: 'none',
      background: 'transparent',
      border: 0,
      display: 'block',
      fontSize: 16,
      height: '100%',
      padding: `${Space.S10}px ${Space.S20}px 0 ${Space.S20}px`,
      width: '100%',

      ':focus': {
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
      padding: `0 ${Space.S20}px`,

      '> li': {
        padding: `${Space.S25}px 0`,
        ':not(:last-of-type)': {
          borderBottom: `1px solid ${Color.GRAY_LIGHT}`,
        },
      },
    },
  }),
};

export default styles;
