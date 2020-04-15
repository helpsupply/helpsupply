const RequestKinds = require('./kinds');

// These are pulled from the Airtable export given to us by MANYC
const CHOICE_DELIVER_GROCERIES = 'sel2id9wbZhujdxrW';
const CHOICE_HEALTHCARE_WORKER = 'sel9iXUHwQBxwJR9A';

function get_field(name) {
  return (request) => {
    return request[name];
  };
}

function always(resp) {
  return (request) => {
    return resp;
  };
}

const FIELD_MAP = {
  Source: always('help.supply'),
  'Source ID': get_field('id'),
  Cell: get_field('phone'),
  Email: get_field('email'),
  'First Name': get_field('first_name'),
  'Last Name': get_field('last_name'),
  'Zip Code': get_field('zip_code'),
  'Cross Streets': get_field('cross_streets'),
  'What borough/region are you in?': (request) => {
    return {
      Brooklyn: 'selzJV1oeBWzfMkgL',
      Bronx: 'selkUoJSAVkXrya7h',
      Queens: 'selma30mltZzqi1iq',
      'Staten Island': 'selkr7s8xnZNSXoiR',
      Manhattan: 'selihZrYb0KwDJKDi',
    }[request.borough_name];
  },
  'What neighborhood?': (request) => {
    return [
      Neighborhoods[request.borough_name + ': ' + request.neighborhood_name],
    ];
  },
  'What type(s) of support are you seeking?': always([
    CHOICE_DELIVER_GROCERIES,
  ]),
  'Are you, or anyone in your household in one or more of these hardest-hit groups? Please select all that apply.': always(
    [CHOICE_HEALTHCARE_WORKER],
  ),
  'Which of these ways are best to get in touch with you?': (request) => {
    return {
      TEXT: ['selcp4xYi4krApJaA'],
      CALL: ['sel4Kt8uCXDtWnUmO'],
      EMAIL: ['selhaWIIpvrt6LOeH'],
    }[request.preferred_contact];
  },
  'How soon do you need support?': (request) => {
    return {
      IMMEDIATELY: 'selqRjvo5aOH1klD9',
      FEW_DAYS: 'selYKne9Et1ixIAqG',
      SOON: 'selTT0Yv0ED8OFoJr',
    }[request.urgency];
  },
  "Language Access: is your primary language something other than English, for which you'd need translation & interpretation support to connect to volunteers?": (
    request,
  ) => {
    if (request.language_preference === 'English') return [];
    // This was made from manyc_format.json with the following python:
    // print(json.dumps({f['name']: f['id'] for f in fmt['fields']['Language Access: is your primary language something other than English, for which you\'d need translation & interpretation support to connect to volunteers?']['options']['choices']}, indent=2))
    return [
      {
        Spanish: 'sel6HBB1sseIvk12y',
        'Chinese: Mandarin': 'sel9W4YTtAL6rQsZv',
        'Chinese: Cantonese': 'selz95jKRIRZo2smJ',
        Russian: 'selcWdQAghhjlxyL5',
        'Haitian Kreyol': 'selgElNpF6ttrJsic',
        Bengali: 'selOwwFtMq223xIUR',
        Yiddish: 'sel9WeUMlQYwUvIEF',
        French: 'selwB422p33CrDhBu',
        Italian: 'selrKXBvC7OPEqkoQ',
        Korean: 'selh9WtjSDxemn1TO',
        Arabic: 'selMaBAd4gKZRSuqb',
        Polish: 'selAKfOzLn60wflCx',
        Tagalog: 'selF6sKFs5SXacvyj',
        ASL: 'selcU4MBeFwV1VweH',
      }[request.language_preference],
    ];
  },
  'Anything else you want to share about your situation at this time?': (
    request,
  ) => {
    return `
This is a request from help.supply.

Delivery Preference:
- ${request.delivery_day}
- ${request.delivery_window}

Grocery List:
${request.grocery_list}

Dietary Restrictions:
${request.dietary_restrictions}

Other Info:
${request.other_notes}
`;
  },
};

const MANYCMetadata = {
  id: 'manyc',
  Organization: 'Mutual Aid NYC',
  Kind: RequestKinds.GROCERY,
  ZipCodes: [10001, 10002],
  // Called by the backend when a request is saved with
  // organization = 'manyc'
  DeliverRequest: (backend, request) => {
    // Get the Webhook from the Database
    let url = backend.getWebhookForOrg('manyc');

    let payload = {};
    for (const field in FIELD_MAP) {
      payload[field] = FIELD_MAP[field](request);
    }

    // Send the request
    backend.postWebhook(url, payload);
  },
  // Called by the backend when MANYC pushes an update
  // about a request to our webhook
  HandleUpdate: (row) => {
    // If row is acknowledged, send an email/text to
    // the end user
  },
};

// Made from manyc_format.json with the following python:
// print(json.dumps({v:k for k,v in fmt['fields']['What neighborhood?']['choices'].items()},indent=2))
const Neighborhoods = {
  'Brooklyn: Midwood': 'recFmntRNA2ogXWTv',
  'Brooklyn: Bedford': 'reck6ZNuyUBPY6PqU',
  'Bronx: Fordham South': 'recbn89fpmX3WJcAG',
  'Brooklyn: Borough Park': 'rec8P7urnVXn1RUV3',
  'Brooklyn: Rugby-Remsen Village': 'recmgim5DLUJxIwg3',
  'Queens: East Flushing': 'reckgDP5Dl8FlTRc1',
  'Queens: Woodhaven': 'recBt8MRpzwchW2SN',
  'Brooklyn: Madison': 'recsmnxsnlyIJQ8Rs',
  'Queens: Auburndale': 'recXVn0EGs8hiB0Hd',
  'Bronx: Williamsbridge-Olinville': 'recnmRp8VOPw8T4aW',
  'Queens: Murray Hill': 'reclnd7HtQc736XTR',
  'Queens: East Elmhurst': 'recb2qULGHl160xaB',
  'Brooklyn: Brownsville': 'rec7qT3Ukge53eS72',
  'Brooklyn: East New York (Pennsylvania Ave)': 'recdxgPMUKkwBZ0pz',
  'Brooklyn: Kensington-Ocean Parkway': 'recOibbsqqo8EsKnT',
  'Bronx: Parkchester': 'recikCXGrAeMfjYvN',
  'Brooklyn: Erasmus': 'recBZzWKFeOYoCQ2d',
  'Queens: Cambria Heights': 'reclz1tk6mTivjj1o',
  'Brooklyn: East Flatbush-Farragut': 'recpmRDBDcaIYbptB',
  'Brooklyn: Ocean Parkway South': 'rec7LnO49Z8E8FaJ1',
  'Brooklyn: Starrett City': 'recp5MW4PMErg7Yds',
  'Bronx: Morrisania-Melrose': 'rec37zKWTYbIsmckj',
  'Queens: Elmhurst': 'recQLh0tYzrNWIjWe',
  'Manhattan: East Village': 'recOqk3gdEC0NeY8a',
  'Queens: Glen Oaks-Floral Park-New Hyde Park': 'recgdX7TxWTQ5fUtL',
  'Bronx: Longwood': 'rec02NiJe7AlEIYVU',
  'Manhattan: Yorkville': 'recVFUkRNzMc6c6Jq',
  'Manhattan: Upper East Side-Carnegie Hill': 'recxfWdLdX5IynHO1',
  'Brooklyn: Windsor Terrace': 'rec522avpxTsZYDTt',
  'Queens: Hammels-Arverne-Edgemere': 'recHo8NvycTYuDpEX',
  'Bronx: Rikers Island': 'recZfypEmfU9qRGGh',
  'Bronx: Hunts Point': 'reci4tzA3fPCxt6Kp',
  'Queens: Jackson Heights': 'recov0vOrgb5mcGW3',
  'Brooklyn: Bath Beach': 'recyTTNQoPNSlMGU4',
  'Staten Island: Old Town-Dongan Hills-South Beach': 'rec0qlbsZeGuB2Z5J',
  'Brooklyn: Flatbush': 'recuTrcMjZ1D2Qcf3',
  'Bronx: Melrose South-Mott Haven North': 'rec2t24tXc6cwIk0g',
  'Brooklyn: Ocean Hill': 'recgeLPXZ3SGIipTs',
  'Manhattan: Morningside Heights': 'recxEYxGKWb8DFzgh',
  'Bronx: Soundview-Bruckner': 'recqafiqtCch4mdVk',
  'Bronx: Allerton-Pelham Gardens': 'recaeQa9kbZBSVt7u',
  'Queens: Jamaica Estates-Holliswood': 'recp6j00HLyHSlN5l',
  'Queens: Hollis': 'recY3v69enmYX082Y',
  'Brooklyn: Flatlands': 'recCHOZeBh7va2OiN',
  'Brooklyn: East New York': 'recrFu0hjbvjX9ozi',
  'Bronx: Kingsbridge Heights': 'recpGjz65uG23bggR',
  'Queens: Springfield Gardens North': 'rec3EtJBOXMBCip3T',
  'Brooklyn: Canarsie': 'rec9JC9901xXKsFFg',
  'Bronx: Norwood': 'recJ9qrth3zUYwQtF',
  'Manhattan: Manhattanville': 'rec3zQ6ghaLPibVW6',
  'Manhattan: West Village': 'recaXNSQkV7iCr94j',
  'Staten Island: Grasmere-Arrochar-Ft. Wadsworth': 'reczAdepEVNjCRagg',
  'Queens: Queens Village': 'recSyLdO8d1iio35o',
  'Manhattan: Chinatown': 'recnfvD5ybIKaWsnZ',
  'Bronx: Pelham Bay-Country Club-City Island': 'rec2KvvLIwFOhGH7N',
  'Bronx: Woodlawn-Wakefield': 'recBmOqVIYxCrSVGU',
  'Queens: Old Astoria': 'recNwHcNE984L0wvD',
  'Queens: Astoria': 'recsv0X6I0uxM6aZu',
  'Manhattan: Stuyvesant Town-Cooper Village': 'recKbNC5mCSOhuCKK',
  'Brooklyn: Dyker Heights': 'rec2GAND7XkWaTFeI',
  'Brooklyn: Bensonhurst West': 'recqXfY2BxebbYfoT',
  'Staten Island: West New Brighton-New Brighton-St. George':
    'recvBZSsMKCM2KzOV',
  'Staten Island: New Brighton-Silver Lake': 'recHq29roVId6gcbC',
  'Staten Island: Westerleigh': 'recBPmIRyr2aqq3Mw',
  'Bronx: University Heights-Morris Heights': 'recQ57zLkv1Qc7tBU',
  'Queens: Bayside-Bayside Hills': 'recZ9s2Z5J5Rpg2PW',
  'Brooklyn: Crown Heights North': 'recrAtENqaM69Ou8l',
  'Bronx: East Concourse-Concourse Village': 'recj2yYFjvvTsJg0Y',
  'Queens: North Corona': 'recq6jNXmskCoBzLS',
  'Brooklyn: Cypress Hills-City Line': 'recMxZoaLPOUSMIrT',
  'Queens: Kew Gardens Hills': 'recfiq1KY1fF1tIb6',
  'Queens: Pomonok-Flushing Heights-Hillcrest': 'recqhk1JBWvy7rd36',
  'Brooklyn: North Side-South Side': 'recpuGcE39Ktu6Xpq',
  'Manhattan: Lower East Side': 'recljPXU53dmQpLYp',
  'Brooklyn: Greenpoint': 'recTkKYmZMe8omFTv',
  'Bronx: Spuyten Duyvil-Kingsbridge': 'recvpRYwmZ9BBQrEQ',
  'Brooklyn: Sunset Park East': 'recV6x3wv2z0vuKr2',
  'Manhattan: Marble Hill-Inwood': 'recAjO3MJr7zEcdR0',
  'Brooklyn: Homecrest': 'rec9Rw2clHIYxmIwD',
  'Manhattan: Washington Heights North': 'recy1h8n5nUVwipgh',
  'Queens: Steinway': 'recN5SK81vKkbKE5W',
  'Bronx: Mott Haven-Port Morris': 'recYFRt41f1XXmwOE',
  'Brooklyn: West Brighton': 'recMdc3F9cy9OC9HZ',
  'Manhattan: Central Harlem North-Polo Grounds': 'recvJZw6AmV5UpeS1',
  'Queens: Queensbridge-Ravenswood-Long Island City': 'recl6QwqyELNfV4Wd',
  'Staten Island: New Dorp-Midland Beach': 'rec3wbTMDvCcTdN7q',
  'Bronx: Van Cortlandt Village': 'recJAOAgQou2iJftV',
  'Bronx: Co-op City': 'recbqgWlAEtwUKt2Y',
  'Brooklyn: Bay Ridge': 'recnS09z5gpEJVwU1',
  'Brooklyn: Sunset Park West': 'recxt7MHeVBExSEPF',
  'Brooklyn: Fort Greene': 'recdUWx0t0pMGITMO',
  'Manhattan: SoHo-TriBeCa-Civic Center-Little Italy': 'recbRytWj2V9JDMOP',
  'Manhattan: Battery Park City-Lower Manhattan': 'recCfY0YgihGizfsj',
  'Manhattan: Clinton': 'rec9tHltbOEbPNuDa',
  'Brooklyn: Prospect Heights': 'recjoDIdFeWOpAbkw',
  'Queens: Baisley Park': 'recuNKnqv6li4fYhM',
  'Queens: South Jamaica': 'recvUTmfci9434f9I',
  'Queens: Ozone Park': 'recL7HVHhytXYUJah',
  'Brooklyn: Georgetown-Marine Park-Bergen Beach-Mill Basin':
    'recTYu5z0IHz2QOU0',
  'Brooklyn: Brighton Beach': 'recI1tN6ZqCYBTJvt',
  'Brooklyn: Bensonhurst East': 'recECsyJy8KYhCHlN',
  'Bronx: West Farms-Bronx River': 'recXIS2yDN2DBBa56',
  'Brooklyn: Sheepshead Bay-Gerritsen Beach-Manhattan Beach':
    'rec15BrBYyPfE3tsp',
  'Bronx: Westchester-Unionport': 'recJMz4CtN9S0E1Wk',
  'Staten Island: Oakwood-Oakwood Beach': 'recoVirlMomPBw3rn',
  'Staten Island: Grymes Hill-Clifton-Fox Hills': 'recVWklQpSugYHRRp',
  'Brooklyn: Park Slope-Gowanus': 'recz4Nvdj6LtjHnw9',
  'Staten Island: Stapleton-Rosebank': 'recyv21YT02FvxeMR',
  'Queens: Fresh Meadows-Utopia': 'recQXP5W7lZSIABr3',
  'Queens: Bellerose': 'recxdRBDOB6Dnhyfg',
  'Brooklyn: Stuyvesant Heights': 'recvhiS3Ga0Ne5upp',
  'Brooklyn: East Williamsburg': 'recG5pRUGiWYwpNIt',
  'Queens: Ridgewood': 'recg9lPKRheC8wWST',
  'Manhattan: East Harlem South': 'rec4UTwqIxERvWYdA',
  'Queens: Rego Park': 'recs9BM9VTdezCmAP',
  'Manhattan: East Harlem North': 'recQQgNTXMPPAhDiv',
  'Brooklyn: Bushwick North': 'recVyiOYR6ZhWSYrE',
  'Brooklyn: Bushwick South': 'recPdXQiVWunYOReZ',
  'Manhattan: Central Harlem South': 'recfinrr8sOvRUuhR',
  'Queens: College Point': 'recfg6pFPMxSMzuyN',
  'Manhattan: Midtown-Midtown South': 'recWPKzfYdsmx2Ou4',
  'Queens: Glendale': 'recMWeh94uLQ7NRm0',
  'Staten Island: Charleston-Richmond Valley-Tottenville': 'recBjSfEbTTJ6ynDU',
  'Staten Island: park-cemetery-etc-Staten Island': 'rec6r0OtLou0OVz0e',
  'Staten Island: New Springville-Bloomfield-Travis': 'recjLfi1ZRT6MALJJ',
  'Staten Island: Todt Hill-Emerson Hill-Heartland Village-Lighthouse Hill':
    'recW79Q8lS06VqHGl',
  'Queens: South Ozone Park': 'recAPUS6dm9dY9DmD',
  'Queens: Lindenwood-Howard Beach': 'recluf4zEEcJYuK1w',
  'Brooklyn: Prospect Lefferts Gardens-Wingate': 'recn6OsVMt8pL31NC',
  'Manhattan: Murray Hill-Kips Bay': 'recdPbg6a7a9eoiiS',
  "Staten Island: Mariner's Harbor-Arlington-Port Ivory-Graniteville":
    'recVbFPnIGQj65R1R',
  'Brooklyn: Crown Heights South': 'recI698QBEWVKsnvX',
  'Brooklyn: Brooklyn Heights-Cobble Hill': 'recw5iuCSlAEHuIVx',
  'Staten Island: Port Richmond': 'recCJoH7RxgGOuDVI',
  'Queens: Hunters Point-Sunnyside-West Maspeth': 'reck06Owio4YzXt65',
  'Bronx: Claremont-Bathgate': 'recdQjwnYKLtp3F8J',
  'Bronx: Van Nest-Morris Park-Westchester Square': 'reczIGeeu4YOarhXW',
  'Bronx: Pelham Parkway': 'recFe0yJd6Z5PNNvj',
  'Bronx: Mount Hope': 'recr4XGLAUrqlMOMo',
  'Queens: Ft. Totten-Bay Terrace-Clearview': 'recOQ6UtX1Wwf12qe',
  'Queens: Whitestone': 'recmdfvjBplx0fxTl',
  'Manhattan: Turtle Bay-East Midtown': 'recNlt2F1q8skIS4d',
  'Manhattan: Lenox Hill-Roosevelt Island': 'recaX8Aibck9npHw0',
  'Queens: Elmhurst-Maspeth': 'recksaz1vd4NALLiR',
  'Queens: Woodside': 'recBYIJTUTaHpypf6',
  'Queens: St. Albans': 'recc65thfAFIctcQf',
  'Queens: Laurelton': 'recyMqnFESFsT5SDW',
  'Manhattan: Hamilton Heights': 'recHfDWCfIixTtjco',
  'Queens: Jamaica': 'recBktp3itYt4HwIa',
  'Queens: Richmond Hill': 'recYZwJdSL41enF9H',
  'Queens: Briarwood-Jamaica Hills': 'recmpl5u6ZdbqdQdG',
  'Queens: Kew Gardens': 'recLKRfOGV9ZTW2Ek',
  'Queens: Middle Village': 'recMr3d111TjZFZ8c',
  'Queens: Maspeth': 'rectMrWp17sf5Ixz3',
  'Manhattan: Upper West Side': 'recpc0a5HXlo3VvWC',
  'Manhattan: Lincoln Square': 'rechieU95JducDzef',
  'Bronx: Bronxdale': 'recGLjiJKduYhjQPf',
  'Queens: Oakland Gardens': 'receJSrMx6z8bFEio',
  'Queens: Douglas Manor-Douglaston-Little Neck': 'recqQyCPgqlFK7jPN',
  "Staten Island: Annadale-Huguenot-Prince's Bay-Eltingville":
    'recmMliRUS3DCI0eJ',
  'Staten Island: Great Kills': 'recDGcCeTbwNcO2sW',
  'Brooklyn: Seagate-Coney Island': 'rec1BQcSXR4wDZolF',
  'Queens: Corona': 'recLmNuSqZdJEeJ5d',
  'Bronx: Schuylerville-Throgs Neck-Edgewater Park': 'recWOKlJ2oaE5a6OX',
  'Brooklyn: Gravesend': 'rec2uZuZ6AgqthNlh',
  'Bronx: East Tremont': 'recI4gYIyECAx9Agh',
  'Bronx: North Riverdale-Fieldston-Riverdale': 'reckiWvjPaMV1eo9u',
  'Bronx: Bedford Park-Fordham North': 'recaksG8pS45TDcwr',
  'Bronx: Belmont': 'rectpxHxyKxIj7o5X',
  'Bronx: Eastchester-Edenwald-Baychester': 'recTlOpY9Z08Mm7Fo',
  'Queens: Breezy Point-Belle Harbor-Rockaway Park-Broad Channel':
    'recADLCLRCk9CL1aQ',
  'Bronx: Crotona Park East': 'recoOpyF9lXJVqD21',
  'Staten Island: Rossville-Woodrow': 'recdHFeJ7wbbK45Nc',
  'Staten Island: Arden Heights': 'recp84BdiYsHaXyCi',
  'Queens: Far Rockaway-Bayswater': 'rec4jt2Ncc7gqwsLz',
  'Bronx: Soundview-Castle Hill-Clason Point-Harding Park': 'rec0KML4kLDlWjz94',
  'Bronx: park-cemetery-etc-Bronx': 'recFiousFI5IRTbJN',
  'Brooklyn: Carroll Gardens-Columbia Street-Red Hook': 'recHKd9TLlHMzf1GN',
  'Manhattan: park-cemetery-etc-Manhattan': 'recyKmq9bGUz4NU8A',
  'Queens: Rosedale': 'recMF3izsvyubLpgg',
  'Queens: Flushing': 'rechCFmW4jsJYcZ7S',
  'Queens: Queensboro Hill': 'recqpWGmiPqH1qhYw',
  'Manhattan: Hudson Yards-Chelsea-Flatiron-Union Square': 'recqpoquHL639ecz0',
  'Manhattan: Gramercy': 'recjiXKUkDLiWsgiw',
  'Brooklyn: DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill':
    'reci6AYmzKBOoj3DI',
  'Brooklyn: Clinton Hill': 'recxwkBOYl4Uy3ROu',
  'Brooklyn: Williamsburg': 'recTeDwfXqNPUMM1Z',
  'Brooklyn: park-cemetery-etc-Brooklyn': 'recNtb1TSF491VYo7',
  'Manhattan: Washington Heights South': 'rec0AdDldHb0yA5pa',
  'Bronx: Highbridge': 'recPuiBaenTG5Kq8d',
  'Bronx: West Concourse': 'recYdEqGYEZ90Ufo8',
  'Queens: Forest Hills': 'recWSNwilPfOxEcrO',
  'Queens: park-cemetery-etc-Queens': 'recSHPu2YOd7O1rds',
  'Queens: Springfield Gardens South-Brookville': 'recpJNBz7imj29Lb2',
  'Queens: Airport': 'rec19d3sh1Xl7QlMa',
};

export default MANYCMetadata;
