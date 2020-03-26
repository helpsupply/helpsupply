/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import styles from './Autosuggest.styles'

class Typeahead extends React.Component {
  static propTypes = {
    getSuggestionValue: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    suggestions: PropTypes.array.isRequired,
    renderSuggestion: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      isFocused: false,
      userInput: '',
    }
  }

  onChange = (_, { newValue }) => {
    const isObject = typeof newValue === 'object'
    const value = isObject ? newValue.label : newValue
    if (!value) {
      this.props.onSelect(undefined)
    }

    this.setState({ userInput: value })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.onSearch(value)
    this.setState({ userInput: value })
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  toggleFocus = () => {
    this.setState({ isFocused: !this.state.isFocused })
  }

  onSuggestionSelect = (e, { suggestion }) => {
    e.preventDefault()
    this.props.onSelect(suggestion.id)
  }

  render() {
    const { isFocused, userInput } = this.state
    const {
      label,
      suggestions,
      getSuggestionValue,
      renderSuggestion,
    } = this.props

    const inputProps = {
      value: userInput,
      onBlur: this.toggleFocus,
      onChange: this.onChange,
      onFocus: this.toggleFocus,
    }

    return (
      <div css={[styles.root, isFocused && styles.active]}>
        <label css={styles.container}>
          {label && (
            <div
              css={[
                styles.label,
                (isFocused || userInput) && styles.activeLabel,
              ]}>
              {label}
            </div>
          )}
        </label>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          onSuggestionSelected={this.onSuggestionSelect}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    )
  }
}

export default Typeahead
