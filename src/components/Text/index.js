/** @jsx jsx */
import { jsx } from '@emotion/core'
import { TEXT_TYPE } from './constants'
import { textStyles } from './Text.styles'

export const Text = ({ styles, children, type = TEXT_TYPE.BODY_1, as: Tag = 'span' }) => (
    <Tag css={[textStyles[type], styles]}>{children}</Tag>
  )

export default Text;
