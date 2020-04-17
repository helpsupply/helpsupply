/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useState } from 'react';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { ReactComponent as Check } from 'static/icons/check.svg';

import styles from './Checkbox.styles';

function InputCheckbox({ label, customOnChange, value, ...rest }) {
  const [checked, setChecked] = useState(value);

  const onChange = useCallback(() => {
    if (customOnChange) {
      customOnChange(!checked);
    }
    setChecked(!checked);
  }, [checked, customOnChange]);

  return (
    <label css={styles.label}>
      <input
        checked={checked}
        css={styles.input}
        type="checkbox"
        onChange={onChange}
        {...rest}
      />
      <div css={[styles.iconContainer, checked && styles.iconContainerChecked]}>
        <Check css={[styles.icon, checked && styles.iconChecked]} />
      </div>
      <Text css={styles.text} type={TEXT_TYPE.BODY_2}>
        {label}
      </Text>
    </label>
  );
}

export default InputCheckbox;
