/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import * as tools from '../../functions'
import * as hospital_index from '../../data/hospital_index'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'
import Text from 'components/Text'
import { TEXT_TYPE } from 'components/Text/constants'
import { withRouter } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import Autosuggest from 'components/Autosuggest'
import Box from 'components/Box'
import { IconButton, PrimaryButton } from 'components/Button'
import { ReactComponent as Back } from 'static/icons/back-circle.svg'

import styles from './Request.styles.js'

const renderSuggestion = ({ hospital }, { query }) => {
  const nameMatches = AutosuggestHighlightMatch(hospital.name, query)
  const nameParts = AutosuggestHighlightParse(hospital.name, nameMatches)
  const nameMatch = (
    <span>
      {nameParts.map((part, index) => {
        const className = part.highlight
          ? 'react-autosuggest__suggestion-match'
          : null

        return (
          <span className={className} key={index}>
            {part.text}
          </span>
        )
      })}
    </span>
  )

  const cityMatches = AutosuggestHighlightMatch(hospital.name, query)
  const cityParts = AutosuggestHighlightParse(hospital.city, cityMatches)
  const cityMatch = (
    <span>
      {cityParts.map((part, index) => {
        const className = part.highlight
          ? 'react-autosuggest__suggestion-match'
          : null

        return (
          <span className={className} key={index}>
            {part.text}
          </span>
        )
      })}
    </span>
  )

  return (
    <div>
      <Text as="div" type={TEXT_TYPE.BODY_2}>
        {nameMatch}
      </Text>
      <Text as="div" type={TEXT_TYPE.NOTE}>
        {cityMatch}, {hospital.state}
      </Text>
    </div>
  )
}

const getHospitalName = ({ hospital, id }) => ({
  label: hospital.name,
  value: id,
})

class Request extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
      selectedResult: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectHospital = this.handleSelectHospital.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
  }

  handleSelectHospital = (value) => {
    this.setState({ selectedResult: value })
  }

  handleChange(value) {
    if (value.length > 1) {
      let term = value.toUpperCase()
      const searchResults = tools.updateSearch(hospital_index.index, term)
      this.setState({ results: searchResults })
    } else {
      this.setState({
        results: [],
        selectedResult: '',
      })
    }
  }

  handleRedirect() {
    if (!this.state.selectedResult) {
      return
    }

    if (this.props.backend.authLoaded && this.props.backend.isLoggedIn()) {
      this.props.backend
        .dropSiteExists(this.state.selectedResult)
        .then((exists) => {
          if (exists) {
            let url = '/dropsite/' + this.state.selectedResult + '/admin'
            this.props.history.push(url)
          } else {
            let url = '/dropsite/new/admin/' + this.state.selectedResult
            this.props.history.push(url)
          }
        })
    } else {
      let url = '/signup/' + this.state.selectedResult
      this.props.history.push(url)
    }
  }

  doNothing(event) {
    event.preventDefault()
  }

  render() {
    return (
      <Box>
        <form onSubmit={this.handleRedirect} css={styles.root}>
          <div css={styles.form}>
            <IconButton css={styles.back}>
              <Back />
            </IconButton>
            <Text as="h3" type={TEXT_TYPE.HEADER_3} css={styles.title}>
              Find your healthcare facility
            </Text>
            <Text as="p" type={TEXT_TYPE.BODY_2}>
              I'm a healthcare professional working at:
            </Text>
            <Autosuggest
              label="City or healthcare facility"
              suggestions={this.state.results}
              onSearch={this.handleChange}
              getSuggestionValue={getHospitalName}
              renderSuggestion={renderSuggestion}
              onSelect={this.handleSelectHospital}
            />
          </div>
          <PrimaryButton
            onClick={this.handleRedirect}
            disabled={!this.state.selectedResult}
            css={styles.button}>
            <Text type={TEXT_TYPE.BODY_1}>Next</Text>
          </PrimaryButton>
        </form>
      </Box>
    )
  }
}

export default withRouter(Request)
