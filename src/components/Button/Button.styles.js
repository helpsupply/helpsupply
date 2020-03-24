import { css } from '@emotion/core'
import { buttonReset, Color, Radius, Space } from 'lib/theme'
import { type } from './constants'

const styles = {
  root: css({
    ...buttonReset,
    borderRadius: Radius.ROUNDED,
  }),
  [type.FILL]: css({
    color: Color.WHITE,
    height: 65,
    background: Color.CORAL,
    width: '100%',
    ':disabled': {
      background: Color.GRAY_LIGHT
    }
  }),
  [type.LINK]: css({
    textDecoration: 'underline',
  }),
  [type.OUTLINE]: css({
    color: Color.CORAL,
    height: 30,
    padding: `0 ${Space.S10}px`,
    border: `2px solid ${Color.CORAL}`,
    ':disabled': {
      color: Color.GRAY_LIGHT,
      borderColor: Color.GRAY_LIGHT
    }
  }),
}

export default styles