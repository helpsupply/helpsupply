/** @jsx jsx */
import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import Page from 'components/layouts/Page';
import ContactForm from 'containers/ContactForm';

function ContactDropSite({ backend, match }) {
  const [dropsite, setDropsite] = useState();
  useEffect(() => {
    backend.getDropSites(match.params.id).then((data) => {
      setDropsite(data);
    });
  }, [backend, match.params.id]);

  if (!dropsite) {
    return null;
  }

  return (
    <Page currentProgress={4} totalProgress={5}>
      <ContactForm backend={backend} {...dropsite} />
    </Page>
  );
}

export default withRouter(ContactDropSite);
