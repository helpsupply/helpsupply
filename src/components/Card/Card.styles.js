import { css } from '@emotion/core'
import { Color } from 'lib/theme'

export const styles = {
  root: css({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  label: css({
    color: Color.GRAY,
    fontWeight: 500,
  }),
}