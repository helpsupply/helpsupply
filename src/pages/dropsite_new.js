/** @jsx jsx */
import { useEffect, useCallback, useState } from 'react';
import { jsx } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import { Emails } from 'constants/Emails';
import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import Page from 'components/layouts/Page';
import DropSiteForm from 'containers/DropSiteForm';

function NewDropSite({ backend, history, match }) {
  const [dropsite, setDropsite] = useState(undefined);

  useEffect(() => {
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
  }, [backend, match.params.dropsite]);

  const onSubmit = useCallback(
    (hospital) => {
      backend.addDropSite(hospital).then((data) => {
        history.push(
          routeWithParams(Routes.DROPSITE_ADMIN, { id: hospital.location_id }),
        );
      });
    },
    [backend, history],
  );

  return (
    <Page currentProgress={4} totalProgress={5}>
      <DropSiteForm onSubmit={onSubmit} dropSite={dropsite} />
    </Page>
  );
}

export default withRouter(NewDropSite);
