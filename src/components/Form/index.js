/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import HeaderInfo from './HeaderInfo';
import { PrimaryButton } from 'components/Button';

import styles from './Form.styles.js';

export const Form = ({
  buttonLabel = 'Next',
  children,
  description,
  disabled,
  onSubmit,
  title,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} css={styles.root}>
      <div css={styles.sections}>
        <HeaderInfo {...{ title, description }} />
        {children}
      </div>
      <PrimaryButton
        type="submit"
        onClick={onSubmit}
        disabled={disabled}
        css={styles.button}
      >
        <Text type={TEXT_TYPE.BODY_1}>{buttonLabel}</Text>
      </PrimaryButton>
    </form>
  );
};

export default Form;

Form.propTypes = {
  buttonLabel: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
};
