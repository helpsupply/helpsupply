import { css } from '@emotion/core'
import { Color } from 'lib/theme'

const styles = {
  input: css({
    appearance: 'none',
    background: 'transparent',
    border: 0,
    borderBottom: `1.5px solid ${Color.GRAY}`,
    borderRadius: 0,
    display: 'block',
    fontSize: 16,
    height: 50,
    width: '100%',

    ':not([disabled]):focus': {
      borderColor: Color.CORAL,
      outline: 'none',
    },

    '::placeholder': { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: Color.GRAY_50,
      opacity: 1, /* Firefox */
    },
    ':-ms-input-placeholder': { /* Internet Explorer 10-11 */
      color: Color.GRAY_50,
    },
    '::-ms-input-placeholder': { /* Microsoft Edge */
      color: Color.GRAY_50,
    },
  }),
  label: css({
    color: Color.GRAY_50,
    fontSize: 12,
  }),
  root: css({
    display: 'flex',
    flexDirection: 'column',
  }),
}

export default styles