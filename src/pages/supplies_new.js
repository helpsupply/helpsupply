/** @jsx jsx */
import { useEffect, useState, useCallback } from 'react';
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import { Emails } from 'constants/Emails';
import { Routes } from 'constants/Routes';

import Page from 'components/layouts/Page';
import SupplyForm from 'containers/SupplyForm';

function NewSupplyRequest({ backend, history }) {
  const [verified, setVerified] = useState(true);
  const [loading, setLoading] = useState(true);
  const [badDomain, setBadDomain] = useState(false);

  const checkVerification = useCallback(() => {
    if (!backend.isLoggedIn()) {
      window.setTimeout(checkVerification, 100);
      return;
    }

    backend.isValidHealthcareWorker().then((verified) => {
      if (verified) {
        console.log('verified');
        setLoading(false);
        setVerified(true);
      } else {
        setLoading(false);
        setVerified(false);
        setBadDomain(backend.badDomain);
        console.log('not verified, will try again in 30 seconds');
        window.setTimeout(checkVerification, 10000);
      }
    });
  }, [backend]);

  useEffect(() => {
    checkVerification();
  }, [checkVerification]);

  let content = <SupplyForm />;

  if (loading) {
    content = (
      <div className="alert alert-warning" role="alert">
        <div className="spinner-border alertSpinner" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="alertText">
          Verifying your credentials (should be a few minutes). You'll be able
          to edit/add once verified.
        </div>
      </div>
    );
  }

  if (!verified && badDomain) {
    content = (
      <div className="alert alert-danger" role="alert">
        <div className="alertText">
          Your email doesn't look like it's from a healthcare provider. Please{' '}
          <a
            href={Routes.LOGOUT}
            style={{
              color: '#721c24',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
          >
            log out
          </a>{' '}
          and try your work email or contact{' '}
          <a href={`mailto:${Emails.HELP}`}>{Emails.HELP}</a>.
        </div>
      </div>
    );
  }

  return (
    <Page currentProgress={1} totalProgress={5}>
      {content}
    </Page>
  );
}

export default withRouter(NewSupplyRequest);
