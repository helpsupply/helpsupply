/** @jsx jsx */
import { useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import ReactJson from 'react-json-view';

const section = css`
  margin-bottom: 40px;
`;

const EXAMPLE_MENTALHEALTH = {
  kind: 'mentalhealth',
  organization: 'nyccovidcare',

  additionalInfo: 'nope',
  agreement: true,
  date: 'wednesday',
  recurring: true,
  time: 'afternoon',
  type: 'coach',
  urgency: 'soon',
  zip: '10002',
};

const EXAMPLE_CHILDCARE = {
  kind: 'childcare',
  organization: 'workersneedchildcare',

  additionalInfo: 'nothing',
  afternoons: true,
  babySitters: true,
  childCareCenters: true,
  children: {
    '1': {
      birthMonth: 'march',
      birthYear: '2016',
      specialNeeds: 'hi',
    },
    '2': {
      birthMonth: 'may',
      birthYear: '2014',
      specialNeeds: 'nope',
    },
  },
  crossStreet: 'a b',
  enrichmentCenters: true,
  evenings: true,
  freeOptions: true,
  fridays: true,
  householdRisk: 'no',
  mondays: true,
  mornings: true,
  mutualAid: true,
  neighborhood: 'brighton-beach',
  nights: true,
  paymentAbility: '333',
  saturdays: true,
  sundays: true,
  thursdays: true,
  tuesdays: true,
  urgency: 'soon',
  varies: true,
  variesTime: true,
  wednesdays: true,

  // Not integrated yet
  zip_code: '00000',
  neighborhoods: ['Manhattan: Central Harlem'],
};

const EXAMPLE_GROCERY = {
  kind: 'grocery',
  organization: 'manyc',

  additionalInfo: 'nothing',
  crossStreet: 'a b',
  date: {
    seconds: 1588262400,
    nanoseconds: 0,
  },
  dietaryRestrictions: 'none',
  groceryList: 'one two three',
  neighborhood: 'Manhattan: East Village',
  recurring: false,
  status: 'distributed',
  status_updated: 1587278146,
  time: 'evening',
  timeCreated: 1587278008948,
  urgency: 'later',
  zip: '10002',
};

function Request({ backend, initrequest }) {
  const { id, ...pureRequest } = initrequest;

  const [request, setRequest] = useState(pureRequest);
  const [expanded, setExpanded] = useState(false);
  const [edited, setEdited] = useState(false);

  const onEdit = function (body) {
    setEdited(true);
    setRequest(body.updated_src);
  };

  const onSave = async function () {
    await backend.firestore.collection('servicerequest').doc(id).set(request);
    setEdited(false);
  };

  return (
    <div
      css={css`
        width: 100%;
        min-height: 40px;
      `}
    >
      <span>
        A <b>{request.kind}</b> reqeust for <b>{request.organization}</b> by{' '}
        <b>{request.domain}</b> on{' '}
        <b>{new Date(request.timeCreated).toLocaleString()}</b> with status{' '}
        <b>{initrequest.status}</b>
      </span>
      <button
        onClick={(e) => setExpanded(!expanded)}
        css={css`
          float: right;
        `}
      >
        {expanded ? '-' : '+'}
      </button>
      {edited && (
        <button
          onClick={onSave}
          css={css`
            float: right;
          `}
        >
          save
        </button>
      )}
      {expanded && (
        <div
          css={css`
            padding-top: 20px;
            padding-bottom: 30px;
          `}
        >
          <b>Request {id}</b>
          <ReactJson onEdit={onEdit} onAdd={onEdit} src={request} />
        </div>
      )}
    </div>
  );
}

function RequestList({ backend }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Returns a
    return backend.firestore
      .collection('servicerequest')
      .orderBy('timeCreated', 'desc')
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
    <div css={section}>
      <h2>Recent Requests</h2>
      {requests.map((p) => {
        return <Request backend={backend} key={p.id} initrequest={p}></Request>;
      })}
    </div>
  );
}

function HookPayload({ backend, initpayload }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      css={css`
        min-height: 40px;
      `}
    >
      <span>
        A test payload for <b>{initpayload.ref.split('/')[1]}</b> on{' '}
        <b>{new Date(initpayload.receiveTimestamp).toLocaleString()}</b>
      </span>
      <button
        css={css`
          float: right;
        `}
        onClick={(e) => setExpanded(!expanded)}
      >
        +
      </button>
      {expanded && (
        <div
          css={css`
            padding-top: 20px;
            padding-bottom: 30px;
          `}
        >
          <ReactJson src={initpayload} />
        </div>
      )}
    </div>
  );
}

function TestHooks({ backend }) {
  const [payloads, setPayloads] = useState([]);

  useEffect(() => {
    return backend.firestore
      .collectionGroup('payloads')
      .orderBy('receiveTimestamp', 'desc')
      .limit(5)
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
    <div css={section}>
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
  const [requestBody, setRequestBody] = useState({});

  const submitRequest = async function () {
    let req = JSON.parse(JSON.stringify(requestBody));
    req.status = 'open';
    console.log(await backend.saveServiceRequest(req));
  };

  const onEdit = function (body) {
    setRequestBody(body.updated_src);
    console.log(body);
  };

  return (
    <div css={section}>
      <h2>Request Creator</h2>
      <div>
        <button onClick={(e) => setRequestBody(EXAMPLE_MENTALHEALTH)}>
          Load Mental Health
        </button>
        <button onClick={(e) => setRequestBody(EXAMPLE_CHILDCARE)}>
          Load Childcare
        </button>
        <button onClick={(e) => setRequestBody(EXAMPLE_GROCERY)}>
          Load Grocery
        </button>
        <button onClick={submitRequest}>Submit</button>
      </div>
      <div
        css={css`
          padding-top: 20px;
          padding-bottom: 30px;
        `}
      >
        <ReactJson onEdit={onEdit} onAdd={onEdit} src={requestBody} />
      </div>
    </div>
  );
}

function DebugRequests({ backend }) {
  return (
    <div
      css={css`
        width: 1100px;
        margin-left: auto;
        margin-right: auto;
        padding: 40px;
      `}
    >
      <RequestCreator backend={backend}></RequestCreator>
      <RequestList backend={backend}></RequestList>
      <TestHooks backend={backend}></TestHooks>
    </div>
  );
}

export default DebugRequests;
