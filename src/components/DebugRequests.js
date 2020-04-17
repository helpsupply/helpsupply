import React, { useEffect } from 'react';
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
  neighborhoods: ['Manhattan: Central Harlem'],
  preferred_contact: 'PHONE',
  urgency: 'FEW_DAYS',
  language_preference: 'Spanish',
  day: 'Monday',
  time: 'Afternoons',
  recurring: true,
  child_first_name: 'Mini',
  child_last_name: 'Me',
  child_birth_year: '2002',
  child_special_needs: 'none',
  childcare_types: ['BABYSITTERS'],
  payment: '$0',
  at_risk: 'DONTKNOW',
  other_notes: 'i love cookies',
};

const EXAMPLE_GROCERY = {
  kind: 'grocery',
  organization: 'manyc',

  phone: '555-555-5555',
  email: 'test@test.com',
  first_name: 'John',
  last_name: 'Smith',
  zip_code: '00000',
  cross_streets: '1st and mission',
  borough_name: 'Manhattan',
  neighborhood_name: 'Central Harlem South',
  preferred_contact: 'TEXT',
  urgency: 'FEW_DAYS',
  language_preference: 'Spanish',

  delivery_day: '4/17',
  delivery_window: 'morning',
  recurring: false,
  grocery_list: 'pen, pinapple, apple, pen',
  dietary_restrictions: 'none',
  other_notes: 'i love cookies',
};

function Request({ backend, initrequest }) {
  return <div>{initrequest.id}</div>;
}

function RequestList({ backend }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Returns a
    return backend.firestore
      .collection('servicerequest')
      .limit(10)
      .onSnapshot((snapshot) => {
        let nextRequests = [];
        snapshot.forEach((doc) => {
          let p = doc.data();
          p.id = doc.id;
          nextRequests.push(p);
        });
        setRequests(nextRequests);
      });
  }, [backend.firestore]);

  return (
    <div>
      {requests.map((p) => {
        return <Request backend={backend} key={p.id} initrequest={p}></Request>;
      })}
    </div>
  );
}

function HookPayload({ backend, initpayload }) {
  const [payload] = useState(initpayload);

  return <div>{JSON.stringify(payload)}</div>;
}

function TestHooks({ backend }) {
  const [payloads, setPayloads] = useState([]);

  useEffect(() => {
    return backend.firestore
      .collectionGroup('payloads')
      .orderBy('receiveTimestamp', 'desc')
      .onSnapshot((snapshot) => {
        let nextPayloads = [];
        snapshot.forEach((doc) => {
          let p = doc.data();
          p.ref = doc.ref.path;
          p.id = doc.id;
          nextPayloads.push(p);
        });
        setPayloads(nextPayloads);
      });
  }, [backend.firestore]);

  return (
    <div>
      <h2>Test Hook Payloads</h2>
      {payloads.map((p) => {
        return (
          <HookPayload
            backend={backend}
            key={p.id}
            initpayload={p}
          ></HookPayload>
        );
      })}
    </div>
  );
}

function RequestCreator({ backend }) {
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
        <button
          onClick={(e) => setRequestBody(JSON.stringify(EXAMPLE_GROCERY))}
        >
          Load Grocery
        </button>
        <button onClick={submitRequest}>Submit</button>
      </div>
    </div>
  );
}

function DebugRequests({ backend }) {
  return (
    <div>
      <RequestCreator backend={backend}></RequestCreator>
      <RequestList backend={backend}></RequestList>
      <TestHooks backend={backend}></TestHooks>
    </div>
  );
}

export default DebugRequests;
