/** @jsx jsx */
import { Global, jsx } from '@emotion/core';
import { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';

import { ReactComponent as Chevron } from 'static/icons/chevron.svg';

import { dayPickerStyles, styles } from './InputDate.styles';

function InputDate({ label, customOnChange, defaultValue }) {
  const [isFocused, setIsFocused] = useState(false);
  const [initialValue] = useState(defaultValue ? defaultValue : new Date());
  const [value, setValue] = useState(initialValue);
  const dayPicker = useRef(null);

  const toggleFocus = useCallback(() => {
    setIsFocused((value) => !value);
  }, []);

  const handleDayChange = useCallback(
    (selectedDay) => {
      const day = moment(selectedDay).format('MMMM D, YYYY');
      if (customOnChange) {
        customOnChange(day);
      }

      if (!day) {
        setValue('');
        return;
      }
      setValue(day);
    },
    [customOnChange],
  );

  return (
    <label css={[styles.container, isFocused && styles.active]}>
      <Global styles={dayPickerStyles} />
      {label && (
        <div
          css={[
            styles.label,
            (isFocused || value !== initialValue) && styles.activeLabel,
          ]}
        >
          {label}
        </div>
      )}

      <DayPickerInput
        inputProps={{ readOnly: true }}
        ref={dayPicker}
        format="MMMM Do, YYYY"
        formatDate={formatDate}
        parseDate={parseDate}
        onDayChange={handleDayChange}
        onDayPickerHide={toggleFocus}
        onDayPickerShow={toggleFocus}
        placeholder={null}
        selectedDay={value}
        dayPickerProps={{
          disabledDays: {
            before: new Date(),
            after: moment().add('8', 'weeks').toDate(),
          },
          showOutsideDays: true,
        }}
      />
      <Chevron css={styles.chevron} />
    </label>
  );
}

InputDate.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default InputDate;
