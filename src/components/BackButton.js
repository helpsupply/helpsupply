/** @jsx jsx */
import { jsx } from '@emotion/core';
import FormGroup from './Form/FormGroup';
import { Space } from 'lib/theme';
import { IconButton } from 'components/Button';
import { ReactComponent as Back } from 'static/icons/back-circle.svg';

export const BackButton = ({ onClick }) => (
  <FormGroup mb={Space.S30}>
    <IconButton onClick={onClick}>
      <Back />
    </IconButton>
  </FormGroup>
);

export default BackButton;
