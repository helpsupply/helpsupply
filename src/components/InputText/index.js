/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { TEXT_TYPE } from 'components/Text/constants';
import Text from 'components/Text';
import { Controller, useFormContext } from 'react-hook-form';
import { required } from 'lib/utils/validations';

import styles from './InputText.styles';

function InputText({
  customOnChange,
  defaultValue,
  isHalfWidth,
  isRequired = true,
  label,
  name,
  validation,
}) {
  const methods = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(
    methods?.getValues()[name] || defaultValue,
  );
  const onChange = useCallback(
    (event) => {
      if (customOnChange) {
        customOnChange(event.target.value);
      }
      setValue(event.target.value);
      return event.target.value;
    },
    [customOnChange],
  );

  const toggleFocus = useCallback(() => {
    setIsFocused((value) => !value);
  }, []);

  return (
    <div css={[styles.root, isHalfWidth && styles.rootHalfWidth]}>
      <label css={[styles.container, isFocused && styles.active]}>
        {label && (
          <div css={[styles.label, (isFocused || value) && styles.activeLabel]}>
            {label}
          </div>
        )}
        <Controller
          as={<input css={styles.input} />}
          defaultValue={defaultValue}
          name={name}
          onBlur={toggleFocus}
          onFocus={toggleFocus}
          onChange={(args) => onChange(args[0].nativeEvent)}
          rules={{
            ...validation,
            ...(isRequired && { required }),
          }}
        />
      </label>
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.error}>
        {methods?.errors[name]?.message}
      </Text>
    </div>
  );
}

export default InputText;

InputText.propTypes = {
  name: PropTypes.string.isRequired,
};
