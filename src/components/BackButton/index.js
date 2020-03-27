/** @jsx jsx */
import { jsx } from '@emotion/core'

import { IconButton } from 'components/Button'

import { ReactComponent as Back } from 'static/icons/back-circle.svg'

import styles from './BackButton.styles'

export const BackButton = ({ onClick }) => (
  <div css={styles.root}>
    <IconButton onClick={onClick}>
      <Back />
    </IconButton>
  </div>
)

export default BackButton
