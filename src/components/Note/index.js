/** @jsx jsx */
import { jsx } from '@emotion/core';
import Text from 'components/Text';
import { Color } from 'lib/theme';
import { TEXT_TYPE } from 'components/Text/constants';

export const Note = ({ children, ...rest }) => (
  <Text as="p" type={TEXT_TYPE.NOTE} css={{ color: Color.GRAY_50 }} {...rest}>
    {children}
  </Text>
);

export default Note;
