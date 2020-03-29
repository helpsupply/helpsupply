import React from 'react';

import { Emails } from 'constants/Emails';

class HelpFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="helpFooter">
        <div>
          Stuck? <a href={`mailto:${Emails.HELP}`}>{Emails.HELP}</a>
        </div>
      </div>
    );
  }
}

export default HelpFooter;
