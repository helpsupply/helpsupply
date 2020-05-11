/** @jsx jsx */
import { Fragment, useEffect, useState } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import { Routes } from 'lib/constants/routes';
import { isValidZipCode } from 'lib/utils/validations';

import Text from 'components/Text';
import { PrimaryButton } from 'components/Button';
import ServicesList from 'components/ServicesList';

export const AvailableServices = ({ backend }) => {
  const history = useHistory();
  const params = useParams();
  const { t } = useTranslation();
  const { zip: zipRulParam } = params;
  const [services, setServices] = useState();

  useEffect(() => {
    const zip = zipRulParam || backend.getLocalZip();
    // if no zip in url and none in local storage, go to enter your zip form
    if ((!zipRulParam && !backend.getLocalZip()) || !isValidZipCode(zip)) {
      history.push(Routes.SERVICE_LOCATION);
      return;
    }
    const servicesByZip = backend.getServicesForZip(zip);
    // if there are no services for zip, send them to unavailable page
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
      <ServicesList services={services} backend={backend} />
      <PrimaryButton type="submit" onClick={handleSubmit}>
        <Text>{t('global.form.submitLabelNext')}</Text>
      </PrimaryButton>
    </Fragment>
  );
};

export default AvailableServices;
