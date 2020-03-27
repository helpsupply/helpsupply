/** @jsx jsx */
import { jsx } from '@emotion/core'
import styles from './LargeHeader.styles'
import { Color } from 'lib/theme'
import { ReactComponent as Logo } from 'static/icons/logo.svg'

const LargeHeader = () => (
  <div css={styles.root}>
    <Logo fill={Color.WHITE} />
  </div>
)

export default LargeHeader
