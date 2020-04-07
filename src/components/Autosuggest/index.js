/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactAutosuggest from 'react-autosuggest';
import styles from './Autosuggest.styles';

function Autosuggest({
  getSuggestionValue,
  label,
  onSearch,
  onSelect,
  onSuggestionsClearRequested,
  renderSuggestion,
  suggestions,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [userInput, setUserInput] = useState('');

  const onChange = (_, { newValue }) => {
    const isObject = typeof newValue === 'object';
    const value = isObject ? newValue.label : newValue;
    if (!value) {
      onSelect(undefined);
    }

    setUserInput(value);
  };

  const onSuggestionsFetchRequested = useCallback(
    ({ value }) => {
      onSearch(value);
      setUserInput(value);
    },
    [onSearch],
  );

  const toggleFocus = useCallback(() => {
    setIsFocused((value) => !value);
  }, []);

  const onSuggestionSelect = useCallback(
    (event, { suggestion }) => {
      event.preventDefault();
      onSelect(suggestion.id);
    },
    [onSelect],
  );

  const inputProps = {
    value: userInput,
    onBlur: toggleFocus,
    onChange: onChange,
    onFocus: toggleFocus,
  };

  return (
    <div css={[styles.root, isFocused && styles.active]}>
      <label css={styles.container}>
        {label && (
          <div
            css={[styles.label, (isFocused || userInput) && styles.activeLabel]}
          >
            {label}
          </div>
        )}
      </label>
      <ReactAutosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        getSuggestionValue={getSuggestionValue}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelect}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
}

Autosuggest.propTypes = {
  getSuggestionValue: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSuggestionsClearRequested: PropTypes.func.isRequired,
  renderSuggestion: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired,
};

export default Autosuggest;
