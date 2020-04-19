/** @jsx jsx */
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory, useParams } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { isValidZipCode } from 'lib/utils/validations';

import Text from 'components/Text';
import { PrimaryButton } from 'components/Button';
import ServicesList from 'components/ServicesList';

function AvailableServices({ backend }) {
  const history = useHistory();
  const params = useParams();
  const { t } = useTranslation();
  const [services, setServices] = useState();

  const { zip: zipRulParam } = params;

  useEffect(() => {
    const zip = zipRulParam || backend.getLocalZip();

    // if no zip in url and none in localstorage, go to enter your zip form
    if ((!zipRulParam && !backend.getLocalZip()) || !isValidZipCode(zip)) {
      history.push(Routes.SERVICE_LOCATION);
      return;
    }

    const servicesByZip = backend.getServicesForZip(zip);

    // if they somehow get here and there's not services for their zip, send them to unavailable page
    if (!servicesByZip?.length) {
      history.push(Routes.SERVICE_LOCATION_UNAVAILABLE);
      return;
    }

    // if results for zip provided via localstorage or via url param, explicitly store the zip that works
    backend.setLocalZip(zip);
    setServices(servicesByZip);
  }, [backend, history, setServices, zipRulParam]);

  const handleSubmit = () => {
    history.push(Routes.FACILITY);
  };

  return (
    <Fragment>
      <ServicesList services={services} />
      <PrimaryButton type="submit" onClick={handleSubmit}>
        <Text>{t('global.form.submitLabelNext')}</Text>
      </PrimaryButton>
    </Fragment>
  );
}

export default AvailableServices;
