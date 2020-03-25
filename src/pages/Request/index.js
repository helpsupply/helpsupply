/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import * as tools from "../../functions";
import * as hospital_index from "../../data/hospital_index";
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'
import Text from 'components/Text'
import { TEXT_TYPE } from 'components/Text/constants'
import { withRouter } from "react-router-dom";
import { Form } from "react-bootstrap";
import Autosuggest from 'components/Autosuggest'
import Box from "components/Box";
import { IconButton } from 'components/Button'
import { ReactComponent as Back } from 'static/icons/back-circle.svg'

import styles from './Request.styles.js'

const renderSuggestion = ({ hospital }, { query }) => {
  const nameMatches = AutosuggestHighlightMatch(hospital.name, query)
  const nameParts = AutosuggestHighlightParse(hospital.name, nameMatches)
  const nameMatch = <span>
    {nameParts.map((part, index) => {
      const className = part.highlight ? 'react-autosuggest__suggestion-match' : null

      return (
        <span className={className} key={index}>
          {part.text}
        </span>
      )
    })}
  </span>

  const cityMatches = AutosuggestHighlightMatch(hospital.name, query)
  const cityParts = AutosuggestHighlightParse(hospital.city, cityMatches)
  const cityMatch = <span>
    {cityParts.map((part, index) => {
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
        {nameMatch}
      </Text>
      <Text as="div" type={TEXT_TYPE.NOTE}>
        {cityMatch}, {hospital.state}
      </Text>
    </div>
  )
}

const getHospitalName = suggestion => suggestion.hospital.name

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      facilities: [],
      selectedResults: ""
    };
    this.handleChangeDonate = this.handleChangeDonate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectHospital = this.handleSelectHospital.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleChange(value) {
    if (value.length > 1) {
      let term = value.toUpperCase();
      const searchResults = tools.updateSearch(hospital_index.index, term);
      this.setState({ results: searchResults });
    } else {
      this.setState({
        results: [],
        selectedResult: ""
      });
    }
  }

  handleSelectHospital(id) {
    this.setState({ selectedResult: id });
  }

  handleSubmit(event) {
    // this prevents the page from reloading when form is submitted
    if (event) {
      event.preventDefault();
    }
    if (this.state.selectedResult !== "") {
      this.handleRedirect();
    }
  }

  handleRedirect() {
    if (this.state.selectedResult !== "") {
      if (this.props.backend.authLoaded && this.props.backend.isLoggedIn()) {
        this.props.backend
          .dropSiteExists(this.state.selectedResult)
          .then(exists => {
            if (exists) {
              let url = "/dropsite/" + this.state.selectedResult + "/admin";
              this.props.history.push(url);
            } else {
              let url = "/dropsite/new/admin/" + this.state.selectedResult;
              this.props.history.push(url);
            }
          });
      } else {
        let url = "/signup/" + this.state.selectedResult;
        this.props.history.push(url);
      }
    }
  }

  doNothing(event) {
    event.preventDefault();
  }

  componentDidMount() {
    this.props.backend.listDropSites().then(data => {
      this.setState({ facilities: data });
    });
  }

  // DONATE SUPPLIES DROPDOWN HANDLER
  handleChangeDonate(event) {
    let url = "/dropsite/" + event.target.value;
    this.props.history.push(url);
  }

  render() {
    return (
      <Box>
        <IconButton css={styles.back}>
          <Back />
        </IconButton>
        <Text as="h3" type={TEXT_TYPE.HEADER_3} css={styles.title}>Find your healthcare facility</Text>
        <Text as="p" type={TEXT_TYPE.BODY_2}>I'm a healthcare professional working at:</Text>
        <Autosuggest
          label="City or healthcare facility"
          suggestions={this.state.results}
          onSearch={this.handleChange}
          getSuggestionValue={getHospitalName}
          renderSuggestion={renderSuggestion}
        />
      </Box>
    );
  }
}

export default withRouter(Request);
