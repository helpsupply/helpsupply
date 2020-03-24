/** @jsx jsx */
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import { BUTTON_RADIUS, BUTTON_TYPE } from "./constants"

import styles from './Button.styles'

export const PrimaryRoundedButton = ({ children, ...rest }) => (
  <button css={[styles.root, styles[BUTTON_TYPE.FILL], styles[BUTTON_RADIUS.ROUNDED]]} {...rest}>
    {children}
  </button>
)

PrimaryRoundedButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export const PrimaryPillButton = ({ children, ...rest }) => (
  <button css={[styles.root, styles[BUTTON_TYPE.FILL], styles[BUTTON_RADIUS.PILL]]} {...rest}>
    {children}
  </button>
)

PrimaryPillButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export const SecondaryRoundedButton = ({ children, ...rest }) => (
  <button css={[styles.root, styles[BUTTON_TYPE.OUTLINE], styles[BUTTON_RADIUS.ROUNDED]]} {...rest}>
    {children}
  </button>
)

SecondaryRoundedButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export const SecondaryPillButton = ({ children, ...rest }) => (
  <button css={[styles.root, styles[BUTTON_TYPE.OUTLINE], styles[BUTTON_RADIUS.PILL]]} {...rest}>
    {children}
  </button>
)

SecondaryPillButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export const LinkButton = ({ children, ...rest }) => (
  <button css={[styles.root, styles[BUTTON_TYPE.LINK]]} {...rest}>
    {children}
  </button>
)

LinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}
