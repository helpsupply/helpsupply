/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import HeaderInfo from './HeaderInfo';
import { PrimaryButton } from 'components/Button';
import { useForm, FormContext } from 'react-hook-form';

import styles from './Form.styles.js';

export const Form = ({
  buttonLabel,
  children,
  defaultValues,
  description,
  disabled,
  onSubmit,
  title,
}) => {
  const { t } = useTranslation();
  const methods = useForm({
    defaultValues,
    mode: ['onChange'],
  });

  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} css={styles.root}>
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
          <Text type={TEXT_TYPE.BODY_1}>
            {buttonLabel || t('generic.form.submitLabel')}
          </Text>
        </PrimaryButton>
      </form>
    </FormContext>
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
