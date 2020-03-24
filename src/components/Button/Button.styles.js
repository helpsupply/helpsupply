import { css } from '@emotion/core'
import { RADIUS } from '../../lib/theme'
import { BUTTON_TYPE, BUTTON_RADIUS, buttonReset } from './constants'

const styles = {
  root: css({
    ...buttonReset,
    height: 65,
    width: '100%',
    ':disabled': {
      opacity: 0.25
    }
  }),
  [BUTTON_RADIUS.ROUNDED]: css({
    borderRadius: RADIUS.ROUNDED
  }),
  [BUTTON_RADIUS.PILL]: css({
    borderRadius: RADIUS.PILL
  }),
  [BUTTON_TYPE.FILL]: css({
    color: '#FFFFFF',
    background: '#FF5A5F',
  }),
  [BUTTON_TYPE.LINK]: css({
    textDecoration: 'underline'
  }),
  [BUTTON_TYPE.OUTLINE]: css({
    color: '#484848',
    border: '2px solid #484848',
  }),
}

export default styles