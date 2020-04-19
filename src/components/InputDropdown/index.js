/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { TEXT_TYPE } from 'components/Text/constants';
import Text from 'components/Text';
import { ReactComponent as Chevron } from 'static/icons/chevron.svg';
import { Controller, useFormContext } from 'react-hook-form';
import { required } from 'lib/utils/validations';

import styles from './InputDropdown.styles';

const DEFAULT = 'placeholder';

function InputDropdown({
  customkey,
  customOnChange,
  defaultValue,
  inputProps,
  isHalfWidth,
  isRequired = true,
  options = [],
  name,
  label,
  validation,
}) {
  const methods = useFormContext();
  const [value, setValue] = useState(
    methods?.getValues()[name] || defaultValue || DEFAULT,
  );
  const handleChange = useCallback(
    (e) => {
      const { value: newValue } = e.target;
      if (customOnChange) {
        customOnChange(newValue);
      }
      setValue(newValue);
      return e.target.value;
    },
    [customOnChange, setValue],
  );

  return (
    <div css={[styles.root, isHalfWidth && styles.rootHalfWidth]}>
      {label && (
        <div css={[styles.label, value !== DEFAULT && styles.activeLabel]}>
          {label}
        </div>
      )}
      <Controller
        as={
          <select
            css={[
              styles.select,
              value === DEFAULT && styles.selectDefaultState,
            ]}
          >
            <option css={styles.optionLabel} disabled value={DEFAULT}>
              {label}
            </option>

            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        }
        defaultValue={defaultValue ? defaultValue : DEFAULT}
        name={customkey ? customkey : name}
        onChange={(args) => handleChange(args[0].nativeEvent)}
        rules={{
          ...validation,
          ...(isRequired && { required }),
        }}
        {...inputProps}
      />
      <Chevron css={styles.chevron} />
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.error}>
        {methods?.errors[name]?.message}
      </Text>
    </div>
  );
}

export default InputDropdown;

InputDropdown.propTypes = {
  name: PropTypes.string.isRequired,
};
