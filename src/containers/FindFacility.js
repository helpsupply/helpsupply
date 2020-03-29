/** @jsx jsx */
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

import { Space, Color } from 'lib/theme';
import { Routes } from 'lib/constants';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import Form from 'components/Form';
import Autosuggest from 'components/Autosuggest';
import FormGroup from 'components/Form/FormGroup';
import { IconButton } from 'components/Button';

import { ReactComponent as Plus } from 'static/icons/plus-circle.svg';

import * as tools from '../functions';
import * as hospital_index from '../data/hospital_index';

const renderSuggestion = ({ hospital }, { query }) => {
  const nameMatches = AutosuggestHighlightMatch(hospital.name, query);
  const nameParts = AutosuggestHighlightParse(hospital.name, nameMatches);
  const nameMatch = (
    <span>
      {nameParts.map((part, index) => {
        const className = part.highlight
          ? 'react-autosuggest__suggestion-match'
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
          ? 'react-autosuggest__suggestion-match'
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

function FindFacility({ backend, history }) {
  const { t } = useTranslation();
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState('');

  const handleChange = useCallback((value) => {
    if (value.length > 1) {
      let term = value.toUpperCase();
      const searchResults = tools.updateSearch(hospital_index.index, term);
      setResults(searchResults);
    } else {
      setResults([]);
      setSelectedResult('');
    }
  }, []);

  const handleRedirect = useCallback(() => {
    if (!selectedResult) {
      return;
    }

    if (backend.authLoaded && backend.isLoggedIn()) {
      backend.dropSiteExists(selectedResult).then((exists) => {
        if (exists) {
          history.push(Routes.DROPSITE_ADMIN(selectedResult));
        } else {
          history.push(Routes.DROPSITE_NEW_ADMIN(selectedResult));
        }
      });
    } else {
      history.push(Routes.SIGNUP_DROPSITE(selectedResult));
    }
  }, [backend, history, selectedResult]);

  return (
    <Form
      onSubmit={handleRedirect}
      title={t('request.facilitySearch.title')}
      description={t('request.facilitySearch.description')}
      disabled={!selectedResult}
    >
      <Autosuggest
        label={t('request.facilitySearch.search.label')}
        suggestions={results}
        onSearch={handleChange}
        getSuggestionValue={getHospitalName}
        renderSuggestion={renderSuggestion}
        onSelect={setSelectedResult}
      />
      <Text type={TEXT_TYPE.BODY_2}>
        <FormGroup mb={5}>{t('request.facilitySearch.notSeeing')}</FormGroup>
        <IconButton onClick={() => history.push(Routes.NEW_FACILITY)}>
          <Plus css={{ marginRight: Space.S5 }} />
          <span css={{ color: Color.CORAL }}>
            {t('request.facilitySearch.addNew')}
          </span>
        </IconButton>
      </Text>
    </Form>
  );
}

export default FindFacility;
