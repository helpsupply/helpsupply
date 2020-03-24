import { css } from '@emotion/core'
import { buttonReset, Color, Radius } from 'lib/theme'
import { type, radius } from './constants'

const styles = {
  root: css({
    ...buttonReset,
    height: 65,
    width: '100%',
    ':disabled': {
      opacity: 0.25
    }
  }),
  [radius.ROUNDED]: css({
    borderRadius: Radius.ROUNDED
  }),
  [radius.PILL]: css({
    borderRadius: Radius.PILL
  }),
  [type.FILL]: css({
    color: Color.WHITE,
    background: '#FF5A5F',
  }),
  [type.LINK]: css({
    textDecoration: 'underline'
  }),
  [type.OUTLINE]: css({
    color: Color.GRAY,
    border: `2px solid ${Color.GRAY}`,
  }),
}

export default styles