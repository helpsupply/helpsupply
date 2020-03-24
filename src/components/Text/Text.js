/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { TEXT_TYPE, textStyles } from "./Text.styles"

function Text({ children, type = TEXT_TYPE.BODY_1, as: Tag = 'span' }) {
    return (
        <Tag css={css(textStyles[type])}>{children}</Tag>
    );
  }

export default Text;
