/** @jsx jsx */
import { jsx } from '@emotion/core'
import styles from './Box.styles'

export const Box = ({ children, ...rest }) => (
  <div css={styles.root} {...rest}>
    {children}
  </div>
)

export default Box