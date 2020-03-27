/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useCallback } from 'react';
import { ReactComponent as Chevron } from 'static/icons/chevron.svg';

import styles from './InputDropdown.styles';

const DEFAULT = 'placeholder';

function InputDropdown({
  customOnChange,
  inputProps,
  options = [],
  placeholder,
}) {
  const [value, setValue] = useState(DEFAULT);

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
    <div css={styles.root}>
      <select
        css={[styles.select, value === DEFAULT && styles.selectDefaultState]}
        onChange={handleChange}
        value={value}
        {...inputProps}
      >
        <option css={styles.placeholder} disabled value={DEFAULT}>
          {placeholder}
        </option>

        {options.map((o) => {
          return (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          );
        })}
      </select>
      <Chevron css={styles.chevron} />
    </div>
  );
}

export default InputDropdown;
