/** @jsx jsx */
import { useEffect, useCallback, useState } from 'react';
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import Page from 'components/layouts/Page';
import DropSiteForm from 'containers/DropSiteForm';

function NewDropSite({ backend, history, match }) {
  const [dropsite, setDropsite] = useState(undefined);
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
    Promise.resolve(checkVerification()).then(() => {
      backend.getDropSites(match.params.dropsite).then((data) => {
        setDropsite(data);
      });
      // TODO: find out if we need to redirect in any case
      // const dropsite =
      //   hospital_index.index.id_index[match.params.dropsite]
      // if (dropsite?.dropSiteDescription) {
      // history.replace(
      //   `/dropsite/${match.params.dropsite}/admin`
      // )
      // }
    });
  }, [backend, checkVerification, match.params.dropsite]);

  const onSubmit = useCallback(
    (hospital) => {
      backend.addDropSite(hospital).then((data) => {
        let url = '/dropsite/' + hospital.location_id + '/admin';
        history.push(url);
      });
    },
    [backend, history],
  );

  let content = <DropSiteForm onSubmit={onSubmit} dropSite={dropsite} />;

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
            href="/logout"
            style={{
              color: '#721c24',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
          >
            log out
          </a>{' '}
          and try your work email or contact help@help.supply.
        </div>
      </div>
    );
  }

  return (
    <Page currentProgress={4} totalProgress={5}>
      {content}
    </Page>
  );
}

export default withRouter(NewDropSite);
