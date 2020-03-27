/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useState } from 'react';

import styles from './TextArea.styles';

function TextArea({ customOnChange, label, value: initialValue, ...rest }) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(null);

  const onChange = useCallback(
    (event) => {
      if (customOnChange) {
        customOnChange(event.target.value);
      }
      setValue(event.target.value);
    },
    [customOnChange],
  );

  const toggleFocus = useCallback(() => {
    setIsFocused((value) => !value);
  }, []);

  return (
    <label css={[styles.root, isFocused && styles.active]}>
      {label && (
        <div css={[styles.label, value && styles.activeLabel]}>{label}</div>
      )}
      <textarea
        css={styles.textarea}
        onBlur={toggleFocus}
        onFocus={toggleFocus}
        onChange={onChange}
        value={value}
        {...rest}
      />
    </label>
  );
}

export default TextArea;
