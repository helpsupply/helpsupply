/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState, useRef, useCallback } from 'react';
import Text from 'components/Text';
import { ReactComponent as Chevron } from 'static/icons/chevron.svg';

import styles from './InputDropdown.styles';

function InputDropdown({ customOnChange, placeholder, options = [] }) {
  const inputEl = useRef(null);
  const listEl = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  });

  const handleClick = useCallback(
    (event) => {
      if (
        (isOpen && listEl && !listEl.current.contains(event.target)) ||
        event.target === inputEl.current
      ) {
        setIsOpen((isOpen) => !isOpen);
      }
    },
    [isOpen],
  );

  const onChange = useCallback(
    (option) => () => {
      if (customOnChange) {
        customOnChange(option.value);
      }
      setValue(option.label);
      setIsOpen(false);
    },
    [customOnChange],
  );

  return (
    <div css={[styles.root, isOpen && styles.active]}>
      <span css={[styles.placeholder, value && styles.selected]}>
        <Text>{value || placeholder}</Text>
      </span>
      <div value={value} ref={inputEl} css={styles.dropdown}>
        {isOpen && (
          <ul css={styles.list} ref={listEl}>
            {options.map((option) => (
              <li
                onClick={onChange(option)}
                css={styles.option}
                key={option.label}
                value={option.value}
              >
                <Text>{option.label}</Text>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Chevron css={[styles.chevron, isOpen && styles.chevronOpen]} />
    </div>
  );
}

export default InputDropdown;
