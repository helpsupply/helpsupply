/** @jsx jsx */
import { jsx } from '@emotion/core';
import { TEXT_TYPE } from './constants';
import { textStyles } from './Text.styles';

export const Text = ({
  children,
  type = TEXT_TYPE.BODY_1,
  as: Tag = 'span',
  ...rest
}) => (
  <Tag css={textStyles[type]} {...rest}>
    {children}
  </Tag>
);

export default Text;
