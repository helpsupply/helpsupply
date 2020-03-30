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

const Form = ({
  buttonLabel,
  children,
  customChildWrapper,
  customSectionsWrapper,
  subSection,
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
        <div css={[styles.sections, customSectionsWrapper]}>
          <HeaderInfo {...{ title, description }} />
          <div css={[styles.childWrapper, customChildWrapper]}>{children}</div>
        </div>
        <div css={customSectionsWrapper}>
          {subSection}
          <PrimaryButton
            type="submit"
            onClick={onSubmit}
            disabled={disabled}
            css={styles.button}
          >
            <Text type={TEXT_TYPE.BODY_1}>
              {buttonLabel || t('generic.form.submitLabelNext')}
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
  customChildWrapper: PropTypes.string,
  customSectionsWrapper: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  subSection: PropTypes.object,
};
