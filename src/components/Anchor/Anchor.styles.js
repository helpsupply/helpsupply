import { css } from '@emotion/core'
import { Color } from 'lib/theme'

export const styles = {
  root: css({
    color: Color.CORAL,
    fontSize: 'inherit',
    textDecoration: 'none',
    ':hover': {
      color: Color.CORAL,
      textDecoration: 'underline',
    },
  }),
}
