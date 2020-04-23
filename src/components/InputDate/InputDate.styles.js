import { css } from '@emotion/core';
import {
  Borders,
  Color,
  Height,
  InputLableLeftVariant,
  InputPadding,
  Radius,
  Space,
} from 'lib/theme';

const dayPickerStyles = {
  '.DayPicker-wrapper': {
    fontSize: 12,
    margin: Space.S20,
    position: 'relative',
  },
  '.DayPicker-Caption': {
    cursor: 'default',
    margin: `${Space.S10}px 0 ${Space.S20}px ${Space.S5}px`,
    paddingLeft: Space.S5,
  },
  '.DayPicker-Caption > div': {
    fontSize: 16,
    fontWeight: 500,
  },
  '.DayPicker-Weekdays': {
    display: 'table-header-group',
    marginTop: Space.S10,
  },
  '.DayPicker-WeekdaysRow': {
    cursor: 'default',
    display: 'table-row',

    '& abbr': {
      cursor: 'inherit',
    },
  },
  '.DayPicker-Weekday': {
    display: 'table-cell',
    fontSize: 11,
    padding: Space.S5,
    textAlign: 'center',
  },
  '.DayPicker-Weekday abbr[title]': {
    borderBottom: 'none',
    textDecoration: 'none',
  },
  '.DayPicker-Body': {
    display: 'table-row-group',
  },
  '.DayPicker-Week': {
    display: 'table-row',
  },
  '.DayPicker-Day': {
    borderRadius: Radius.ROUNDED,
    cursor: 'pointer',
    display: 'table-cell',
    padding: Space.S10,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  '.DayPicker--interactionDisabled .DayPicker-Day': {
    cursor: 'default',
  },
  '.DayPicker-Day--today': {
    color: Color.PRIMARY,
  },
  '.DayPicker-Day--disabled': {
    color: Color.GRAY_50,
    cursor: 'default',
  },
  '.DayPicker-Day--outside': {
    color: Color.GRAY_30,
    cursor: 'default',
  },
  '.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside)': {
    backgroundColor: Color.PRIMARY,
    color: Color.WHITE,
    position: 'relative',
  },
  '.DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover': {
    backgroundColor: Color.PRIMARY,
    color: Color.WHITE,
  },
  '.DayPickerInput': {
    height: '100%',
  },
  '.DayPickerInput input': {
    appearance: 'none',
    background: 'transparent',
    border: Borders.GRAY2,
    borderRadius: Radius.ROUNDED,
    cursor: 'pointer',
    display: 'block',
    fontSize: 16,
    height: '100%',
    padding: InputPadding,
    userSelect: 'none',
    width: '100%',

    ':focus': {
      outline: 'none',
      borderColor: Color.TERTIARY,
    },

    '::placeholder': {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: Color.GRAY_50,
      opacity: 1 /* Firefox */,
    },
    ':-ms-input-placeholder': {
      /* Internet Explorer 10-11 */ color: Color.GRAY_50,
    },
    '::-ms-input-placeholder': {
      /* Microsoft Edge */ color: Color.GRAY_50,
    },
  },
  '.DayPicker-NavBar': {
    height: Space.S20,
    position: 'absolute',
    right: 0,
    top: 0,
    width: Space.S40,
    marginRight: Space.S10,
  },
  '.DayPicker-NavButton': {
    position: 'absolute',
    height: Space.S20,
    top: 0,
    width: Space.S20,

    '&:before, &:after': {
      content: '""',
      background: Color.PRIMARY,
      borderRadius: '1px',
      display: 'block',
      height: '2px',
      position: 'absolute',
      right: '0',
      width: '8px',
    },
  },
  '.DayPicker-NavButton--next': {
    right: 0,

    '&:before, &:after': {
      right: 0,
    },
    '&:before': {
      top: '7px',
      transform: 'rotate(45deg)',
    },
    '&:after': {
      top: '12px',
      transform: 'rotate(-45deg)',
    },
  },
  '.DayPicker-NavButton--prev': {
    left: 0,

    '&:before, &:after': {
      left: 0,
    },
    '&:before': {
      top: '7px',
      transform: 'rotate(-45deg)',
    },
    '&:after': {
      top: '12px',
      transform: 'rotate(45deg)',
    },
  },
  '.DayPickerInput-OverlayWrapper': {
    position: 'relative',
  },
  '.DayPickerInput-Overlay': {
    background: Color.WHITE,
    borderRadius: 5,
    boxShadow: '0 2px 4px 2px rgba(0, 0, 0, 0.25)',
    left: 0,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
};

const styles = {
  active: css({
    borderColor: Color.SECONDARY,

    '& svg': {
      transform: 'rotate(180deg)',
    },
  }),
  activeLabel: css({
    fontSize: 12,
    paddingTop: Space.S10,
    transition: '0.2s all ease-in-out',
  }),
  chevron: css({
    position: 'absolute',
    pointerEvents: 'none',
    right: Space.S25,
    top: Space.S25,
    transition: 'transform 0.2s ease-in-out',
  }),
  container: css({
    border: Borders.TRANSPARENT,
    borderRadius: Radius.ROUNDED_WRAP,
    cursor: 'pointer',
    display: 'block',
    height: Height.INPUT,
    position: 'relative',
    width: '100%',
  }),
  label: css({
    color: Color.GRAY_50,
    fontSize: 16,
    position: 'absolute',
    height: '100%',
    paddingTop: Space.S20,
    left: InputLableLeftVariant,
    pointerEvents: 'none',
    transition: '0.2s all ease-in-out',
  }),
};

export { dayPickerStyles, styles };
