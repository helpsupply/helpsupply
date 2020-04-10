/** @jsx jsx */
import { useState } from 'react';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import Page from 'components/layouts/Page';
import PageLoader from 'components/Loader/PageLoader';
import ServiceContactForm from 'containers/ServiceContactForm';

function Contact({ backend }) {
  const history = useHistory();
  const [isLoading] = useState(false);

  return (
    <Page
      onBackButtonClick={() =>
        // todo: if user has contact info set, route to userDetail page
        history.push(routeWithParams(Routes.HOME))
      }
      currentProgress={2}
      totalProgress={5}
    >
      {isLoading && <PageLoader />}
      {!isLoading && <ServiceContactForm backend={backend} />}
    </Page>
  );
}

export default Contact;
