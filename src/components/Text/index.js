/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { TEXT_TYPE } from './constants'
import styles from './Text.styles'

export const Text = ({
  children,
  type = TEXT_TYPE.BODY_1,
  as: Tag = 'span',
}) => <Tag css={css(styles[type])}>{children}</Tag>

export default Text
