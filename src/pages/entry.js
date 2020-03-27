import React from 'react';
import { withRouter } from 'react-router-dom';
import Anchor from 'components/Anchor';

class EntryPortal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Anchor href="/request">Need</Anchor>
      </div>
    );
  }
}

export default withRouter(EntryPortal);
