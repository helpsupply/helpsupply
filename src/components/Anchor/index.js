/** @jsx jsx */
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import { styles } from './Anchor.styles'

export const Anchor = ({ children, ...rest }) => (
  <a css={styles.root} {...rest}>
    {children}
  </a>
)

Anchor.propTypes = {
  href: PropTypes.func.isRequired,
}

export default Anchor
