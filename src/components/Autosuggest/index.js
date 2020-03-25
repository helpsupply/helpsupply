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
    renderSuggestion: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      isFocused: false,
      value: '',
    }
  }

  onChange = (_, { newValue }) => {
    this.setState({ value: newValue })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.onSearch(value)
    this.setState({ value })
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  toggleFocus = () => {
    this.setState({ isFocused: !this.state.isFocused })
  }

  render() {
    const { isFocused, value } = this.state
    const { label, suggestions, getSuggestionValue, renderSuggestion } = this.props

    const inputProps = {
      value,
      onBlur: this.toggleFocus,
      onChange: this.onChange,
      onFocus: this.toggleFocus,
    }

    return (
      <div css={[styles.root, isFocused && styles.active]}>
        <label css={styles.container}>
          {label && (
            <div css={[styles.label, (isFocused || value) && styles.activeLabel]}>{label}</div>
          )}
        </label>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    )
  }
}

export default Typeahead
