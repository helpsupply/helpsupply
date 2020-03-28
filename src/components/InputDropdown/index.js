/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { TEXT_TYPE } from 'components/Text/constants';
import Text from 'components/Text';
import { ReactComponent as Chevron } from 'static/icons/chevron.svg';
import { useFormContext } from 'react-hook-form';
import { required } from 'lib/utils/validations';

import styles from './InputDropdown.styles';

const DEFAULT = 'placeholder';

function InputDropdown({
  customOnChange,
  inputProps,
  isHalfWidth,
  options = [],
  name,
  label,
  isRequired = true,
}) {
  const [value, setValue] = useState(DEFAULT);
  const { register, errors } = useFormContext();
  const handleChange = useCallback(
    (e) => {
      const { value: newValue } = e.target;
      if (customOnChange) {
        customOnChange(newValue);
      }
      setValue(newValue);
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
      <select
        css={[styles.select, value === DEFAULT && styles.selectDefaultState]}
        onChange={handleChange}
        name={name}
        defaultValue={DEFAULT}
        ref={register && register({ ...(isRequired && { required }) })}
        {...inputProps}
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
      <Chevron css={styles.chevron} />
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.error}>
        {errors[name]?.message}
      </Text>
    </div>
  );
}

export default InputDropdown;

InputDropdown.propTypes = {
  name: PropTypes.string.isRequired,
};
