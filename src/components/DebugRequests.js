import React from 'react';
import { useState } from 'react';

const EXAMPLE_MENTALHEALTH = {
  kind: 'mentalhealth',
  organization: 'nyccovidcare',

  first_name: 'John',
  last_name: 'Smith',
  email: 'test@test.com',
  phone: '555-555-5555',
  zip_code: '00000',
  preferred_contact: 'PHONE',
  urgency: 'FEW_DAYS',
  language_preference: 'Spanish',
  day: 'Monday',
  time: 'Afternoon',
  recurring: true,
  volunteer_type: 'Life Coach',
  other_notes: 'i love cookies',
};

const EXAMPLE_CHILDCARE = {
  kind: 'childcare',
  organization: 'workersneedchildcare',

  phone: '555-555-5555',
  email: 'test@test.com',
  first_name: 'John',
  last_name: 'Smith',
  zip_code: '00000',
  neighborhoods: ['Manhattan: Central Harlem South'],
  preferred_contact: 'PHONE',
  urgency: 'FEW_DAYS',
  language_preference: 'Spanish',
  day: 'Monday',
  time: 'Afternoon',
  recurring: true,
  child_first_name: 'Mini',
  child_last_name: 'Me',
  child_birth_year: '2000',
  child_special_needs: 'none',
  childcare_types: ['BABYSITTERS'],
  payment: '$0',
  at_risk: 'DONTKNOW',
  other_notes: 'i love cookies',
};

function DebugRequests({ backend }) {
  const [requestBody, setRequestBody] = useState('');

  const submitRequest = async function () {
    console.log(await backend.saveServiceRequest(JSON.parse(requestBody)));
  };

  return (
    <div>
      <textarea
        value={requestBody}
        onChange={(e) => setRequestBody(e.target.value)}
      ></textarea>
      <div>
        <button
          onClick={(e) => setRequestBody(JSON.stringify(EXAMPLE_MENTALHEALTH))}
        >
          Load Mental Health
        </button>
        <button
          onClick={(e) => setRequestBody(JSON.stringify(EXAMPLE_CHILDCARE))}
        >
          Load Childcare
        </button>
        <button onClick={submitRequest}>Submit</button>
      </div>
    </div>
  );
}

export default DebugRequests;
