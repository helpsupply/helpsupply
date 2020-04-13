/** @jsx jsx */
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import Form from 'components/Form';
import Autosuggest from 'components/Autosuggest';

import * as tools from '../functions';
// service todo: update this list with service organizations instead of list of hospitals
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

function ServiceFacilityForm({ backend }) {
  const history = useHistory();
  const { t } = useTranslation();
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);

    // service todo: incorporate facility data below, and decide what validation or state management happens here
    // const facility = hospital_index.index.id_index[selectedResult];
    history.push(routeWithParams(Routes.EMAIL_SIGNUP_FORM));
  }, [history, selectedResult]);

  return (
    <Form
      onSubmit={handleRedirect}
      title={t('service.facilityForm.title')}
      description={t('service.facilityForm.description')}
      disabled={!selectedResult}
      isLoading={isLoading}
    >
      <Autosuggest
        label={t('service.facilityForm.search.label')}
        suggestions={results}
        onSearch={handleChange}
        getSuggestionValue={getHospitalName}
        renderSuggestion={renderSuggestion}
        onSuggestionsClearRequested={() => null}
        onSelect={setSelectedResult}
      />
      <Text type={TEXT_TYPE.BODY_2}>{t('service.facilityForm.notSeeing')}</Text>
    </Form>
  );
}

export default ServiceFacilityForm;
