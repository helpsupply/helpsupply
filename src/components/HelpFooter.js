import React from 'react';

import { Emails } from 'constants/Emails';

import Anchor, { anchorTypes } from 'components/Anchor';

class HelpFooter extends React.Component {
  render() {
    return (
      <div className="helpFooter">
        <div>
          Stuck?{' '}
          <Anchor href={`mailto:${Emails.HELP}`} as={anchorTypes.A}>
            {Emails.HELP}
          </Anchor>
        </div>
      </div>
    );
  }
}

export default HelpFooter;
