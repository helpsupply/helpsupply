/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import Page from 'components/layouts/Page';
import FacilityForm from 'containers/FacilityForm';
import Form from 'components/Form';
import { FacilityConfirmation } from 'components/Confirmation';

function NewFacility({ backend, history }) {
  const [dropSite, setDropSite] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropSiteId, setDropSiteId] = useState('');
  useEffect(() => {
    backend.getDropSites(dropSiteId).then((data) => {
      setDropSite(data);
    });
  }, [backend, dropSiteId]);

  useEffect(() => {
    if (dropSiteId) {
      backend.getDropSites(dropSiteId).then((data) => {
        if (!data) {
          return;
        }
        setLoading(false);
        setDropSite(data);
      });
    }
  }, [backend, dropSiteId, sent]);

  const handleSubmit = (dropSite) => {
    setLoading(true);
    if (dropSiteId) {
      return backend
        .editDropSite({ location_id: dropSiteId, ...dropSite })
        .then((data) => {
          setSent(true);
        });
    }

    backend.addNewDropSite(dropSite).then((data) => {
      if (!data) {
        return;
      }
      setSent(true);
      setDropSiteId(data);
    });
  };

  if (loading) {
    return null;
  }

  if (sent && dropSite.location_id) {
    return (
      <Page currentProgress={2} totalProgress={5}>
        <Form
          onSubmit={() =>
            history.push(
              routeWithParams(Routes.SIGNUP_DROPSITE, {
                id: dropSite.location_id,
              }),
            )
          }
        >
          <FacilityConfirmation
            onEdit={() => setSent(false)}
            name={dropSite.dropSiteFacilityName}
            address={[
              dropSite.dropSiteAddress,
              dropSite.dropSiteCity,
              dropSite.dropSiteState,
              dropSite.dropSiteZip,
            ].join(', ')}
          />
        </Form>
      </Page>
    );
  }

  return (
    <Page currentProgress={2} totalProgress={5}>
      <FacilityForm handleSubmit={handleSubmit} dropSite={dropSite} />
    </Page>
  );
}

export default withRouter(NewFacility);
