/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import Autosuggest from 'react-autosuggest'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'
import Text from 'components/Text'
import { TEXT_TYPE } from 'components/Text/constants'
import styles from './Autosuggest.styles'

const getSuggestionValue = suggestion => suggestion.name

const renderSuggestion = (suggestion, { query }) => {
  const matches = AutosuggestHighlightMatch(suggestion.name, query)
  const parts = AutosuggestHighlightParse(suggestion.name, matches)
  const match = <span>
    {parts.map((part, index) => {
      const className = part.highlight ? 'react-autosuggest__suggestion-match' : null

      return (
        <span className={className} key={index}>
          {part.text}
        </span>
      )
    })}
  </span>

  return (
    <div>
      <Text as="div" type={TEXT_TYPE.BODY_2}>
        {match}
      </Text>
      <Text as="div" type={TEXT_TYPE.NOTE}>{suggestion.address}</Text>
    </div>
  )
}

class Typeahead extends React.Component {
  constructor() {
    super()

    this.state = {
      isFocused: false,
      suggestions: [],
      value: '',
    }
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    console.log(!inputLength ? [] : this.props.suggestions.filter(suggest =>
      suggest.name.toLowerCase().slice(0, inputLength) === inputValue
    ))
    return !inputLength ? [] : this.props.suggestions.filter(suggest =>
      suggest.name.toLowerCase().slice(0, inputLength) === inputValue
    )
  }

  onChange = (_, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ suggestions: this.getSuggestions(value) })
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  toggleFocus = () => {
    console.log('yuh!')
    this.setState({ isFocused: !this.state.isFocused })
  }

  render() {
    const { isFocused, suggestions, value } = this.state
    const { label } = this.props

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
