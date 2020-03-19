let TEXT_INPUT = "TEXT_INPUT";
let LONG_TEXT_INPUT = "LONG_TEXT_INPUT";
let TIMESPANS = "TIMESPANS";
let ZIPCODE = "ZIPCODE";
let AGES = "AGES";
let AGE_RANGE = "AGE_RANGE";
let URL = "URL";

const needTypes = [
  {
    name: "Institutional Equipment",
    id: "equipment_need",
    fields: [
      {
        name: "Description",
        type: TEXT_INPUT,
        id: "subject",
        instructions: "What do you need?",
        example: "i.e. N-95 Masks"
      },
      {
        name: "Comments",
        type: LONG_TEXT_INPUT,
        id: "comments",
        instructions: "Other details?"
      }
    ]
  },
  {
    name: "Personal Supply Runs",
    id: "supply_run_need",
    fields: [
      {
        name: "Description",
        type: TEXT_INPUT,
        id: "subject",
        instructions: "What supplies (groceries, cleaning) do you need?",
        example: "i.e. Groceries for 2"
      },
      {
        name: "Constraints",
        type: LONG_TEXT_INPUT,
        id: "constraints",
        instructions: "Any dietary or other constraints?",
        example: "i.e. We're vegetarian"
      },
      {
        name: "Delivery Window",
        type: TIMESPANS,
        id: "delivery_windows",
        instructions: "When can someone drop it off?",
        example: ""
      },
      {
        name: "Zipcode",
        type: ZIPCODE,
        id: "zipcode",
        instructions: "What zip code do you need supplies?",
        example: "i.e. 94705"
      }
    ]
  },
  {
    name: "Personal Care",
    id: "care_need",
    fields: [
      {
        name: "Description",
        type: TEXT_INPUT,
        id: "subject",
        instructions: "What care do you need?",
        example: "i.e. Babysitting, Caretaking"
      },
      {
        name: "Constraints",
        type: LONG_TEXT_INPUT,
        id: "constraints",
        instructions: "Any special constraints?",
        example: ""
      },
      {
        name: "Care Hours",
        type: TIMESPANS,
        id: "care_hours",
        instructions: "When do you need care?",
        example: ""
      },
      {
        name: "Child Ages",
        type: AGES,
        id: "child_ages",
        instructions: "How old are your children?",
        example: "i.e. 1 and 3"
      },
      {
        name: "Zipcode",
        type: ZIPCODE,
        id: "zipcode",
        instructions: "What zip code do you need childcare?",
        example: "i.e. 94705"
      }
    ]
  }
];

const offerTypes = [
  {
    name: "Institutional Equipment",
    id: "equipment_need",
    fields: [
      {
        name: "Description",
        type: TEXT_INPUT,
        id: "subject",
        instructions: "What do you need?",
        example: "i.e. N-95 Masks"
      },
      {
        name: "Quantity",
        type: TEXT_INPUT,
        id: "qty",
        instructions: "How many do you have",
        example: "i.e. 50"
      },
      {
        name: "Comments",
        type: LONG_TEXT_INPUT,
        id: "comments",
        instructions: "Other details?"
      }
    ]
  },
  {
    name: "Personal Supply Runs",
    id: "supply_run_need",
    fields: [
      {
        name: "Description",
        type: TEXT_INPUT,
        id: "subject",
        instructions: "What can you supply (groceries, cleaning)?",
        example: "i.e. Groceries for 2"
      },
      {
        name: "Comments",
        type: LONG_TEXT_INPUT,
        id: "comments",
        instructions: "Other details?",
        example: ""
      },
      {
        name: "Delivery Window",
        type: TIMESPANS,
        id: "delivery_windows",
        instructions: "When can you drop things off?",
        example: ""
      },
      {
        name: "Zipcode",
        type: ZIPCODE,
        id: "zipcode",
        instructions: "What zip code are you in?",
        example: "i.e. 94705"
      }
    ]
  },
  {
    name: "Personal Care",
    id: "care_need",
    fields: [
      {
        name: "Description",
        type: TEXT_INPUT,
        id: "subject",
        instructions: "What care can you provide?",
        example: "i.e. Babysitting"
      },
      {
        name: "Comments",
        type: LONG_TEXT_INPUT,
        id: "comments",
        instructions: "Other details?",
        example: ""
      },
      {
        name: "Care Hours",
        type: TIMESPANS,
        id: "care_hours",
        instructions: "When are you available to provide care?",
        example: ""
      },
      {
        name: "Child Ages",
        type: AGES,
        id: "child_ages",
        instructions: "What age are you comfortable watching?",
        example: "i.e. 1 and 3"
      },
      {
        name: "Zipcode",
        type: ZIPCODE,
        id: "zipcode",
        instructions: "What zip code do you in?",
        example: "i.e. 94705"
      }
    ]
  }
];

const documentTypes = [
  {
    name: "Call for Help / Organizing Documents",
    id: "link",
    fields: [
      {
        name: "Link Title",
        type: TEXT_INPUT,
        id: "text",
        instructions: "Describe this link",
        example: "i.e. Google Doc for equipment needs"
      },
      {
        name: "Link URL",
        type: URL,
        id: "url",
        instructions: "What's the URL?",
        example: "i.e. https://..."
      }
    ]
  }
];

export { needTypes };
export { offerTypes };
export { documentTypes };
