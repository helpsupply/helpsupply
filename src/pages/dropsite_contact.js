/** @jsx jsx */
import { useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import Page from 'components/layouts/Page';
import ContactForm from 'containers/ContactForm';

function ContactDropSite({ backend, history, match }) {
  const [dropSite, setDropSite] = useState();
  useEffect(() => {
    backend.getDropSites(match.params.id).then((data) => {
      setDropSite(data);
    });
  }, [backend, match.params.id]);

  if (!dropSite) {
    return null;
  }

  return (
    <Page
      onBackButtonClick={() =>
        history.push(
          routeWithParams(Routes.DROPSITE_ADMIN, {
            id: match.params.id,
          }),
        )
      }
      currentProgress={4}
      totalProgress={5}
    >
      <ContactForm backend={backend} dropSite={dropSite} />
    </Page>
  );
}

export default withRouter(ContactDropSite);
