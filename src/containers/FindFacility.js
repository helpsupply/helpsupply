/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import * as tools from "../functions";
import * as hospital_index from "../data/hospital_index";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import Text from "components/Text";
import { TEXT_TYPE } from "components/Text/constants";
import Form from "components/Form";
import Autosuggest from "components/Autosuggest";

const renderSuggestion = ({ hospital }, { query }) => {
  const nameMatches = AutosuggestHighlightMatch(hospital.name, query);
  const nameParts = AutosuggestHighlightParse(hospital.name, nameMatches);
  const nameMatch = (
    <span>
      {nameParts.map((part, index) => {
        const className = part.highlight
          ? "react-autosuggest__suggestion-match"
          : null;

        return (
          <span className={className} key={index}>
            {part.text}
          </span>
        );
      })}
    </span>
  );

  const cityMatches = AutosuggestHighlightMatch(hospital.name, query);
  const cityParts = AutosuggestHighlightParse(hospital.city, cityMatches);
  const cityMatch = (
    <span>
      {cityParts.map((part, index) => {
        const className = part.highlight
          ? "react-autosuggest__suggestion-match"
          : null;

        return (
          <span className={className} key={index}>
            {part.text}
          </span>
        );
      })}
    </span>
  );

  return (
    <div>
      <Text as="div" type={TEXT_TYPE.BODY_2}>
        {nameMatch}
      </Text>
      <Text as="div" type={TEXT_TYPE.NOTE}>
        {cityMatch}, {hospital.state}
      </Text>
    </div>
  );
};

const getHospitalName = ({ hospital, id }) => ({
  label: hospital.name,
  value: id,
});

class FacilityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      selectedResult: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectHospital = this.handleSelectHospital.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleSelectHospital = (value) => {
    this.setState({ selectedResult: value });
  };

  handleChange(value) {
    if (value.length > 1) {
      let term = value.toUpperCase();
      const searchResults = tools.updateSearch(hospital_index.index, term);
      this.setState({ results: searchResults });
    } else {
      this.setState({
        results: [],
        selectedResult: "",
      });
    }
  }

  handleRedirect() {
    if (!this.state.selectedResult) {
      return;
    }

    if (this.props.backend.authLoaded && this.props.backend.isLoggedIn()) {
      this.props.backend
        .dropSiteExists(this.state.selectedResult)
        .then((exists) => {
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

  render() {
    return (
      <Form
        onSubmit={this.handleRedirect}
        title="Find your healthcare facility"
        description="I'm a healthcare professional working at:"
        disabled={!this.state.selectedResult}
      >
        <Autosuggest
          label="City or healthcare facility"
          suggestions={this.state.results}
          onSearch={this.handleChange}
          getSuggestionValue={getHospitalName}
          renderSuggestion={renderSuggestion}
          onSelect={this.handleSelectHospital}
        />
      </Form>
    );
  }
}

export default FacilityForm;
