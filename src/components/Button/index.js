/** @jsx jsx */
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import { radius, type } from "./constants"

import styles from './Button.styles'

export const PrimaryRoundedButton = ({ children, ...rest }) => (
  <button css={[styles.root, styles[type.FILL], styles[radius.ROUNDED]]} {...rest}>
    {children}
  </button>
)

PrimaryRoundedButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export const PrimaryPillButton = ({ children, ...rest }) => (
  <button css={[styles.root, styles[type.FILL], styles[radius.PILL]]} {...rest}>
    {children}
  </button>
)

PrimaryPillButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export const SecondaryRoundedButton = ({ children, ...rest }) => (
  <button css={[styles.root, styles[type.OUTLINE], styles[radius.ROUNDED]]} {...rest}>
    {children}
  </button>
)

SecondaryRoundedButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export const SecondaryPillButton = ({ children, ...rest }) => (
  <button css={[styles.root, styles[type.OUTLINE], styles[radius.PILL]]} {...rest}>
    {children}
  </button>
)

SecondaryPillButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export const LinkButton = ({ children, ...rest }) => (
  <button css={[styles.root, styles[type.LINK]]} {...rest}>
    {children}
  </button>
)

LinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}
