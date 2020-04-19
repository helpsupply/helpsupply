/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useForm, FormContext } from 'react-hook-form';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import HeaderInfo from './HeaderInfo';
import { PrimaryButton } from 'components/Button';
import Loader from 'components/Loader';

import styles from './Form.styles.js';

const Form = ({
  buttonLabel,
  children,
  subSection,
  defaultValues,
  description,
  disabled,
  isLoading,
  onSubmit,
  title,
}) => {
  const { t } = useTranslation();
  const methods = useForm({
    defaultValues,
    mode: ['onChange'],
  });

  const localButtonLabel = disabled
    ? t('global.form.submitLabelCta')
    : t('global.form.submitLabelNext');

  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} css={styles.root}>
        <div css={styles.sections}>
          <HeaderInfo {...{ title, description }} />
          <div css={styles.childWrapper}>{children}</div>
        </div>
        <div>
          {subSection}
          <PrimaryButton type="submit" disabled={disabled} css={styles.button}>
            {isLoading && <Loader passedStyles={styles.loader} />}
            <Text type={TEXT_TYPE.BODY_1}>
              {buttonLabel || localButtonLabel}
            </Text>
          </PrimaryButton>
        </div>
      </form>
    </FormContext>
  );
};

export default Form;

Form.propTypes = {
  buttonLabel: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  subSection: PropTypes.object,
};
