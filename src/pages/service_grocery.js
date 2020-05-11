/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import { Routes } from 'lib/constants/routes';
import { routeWithParams } from 'lib/utils/routes';
import { buildNeighborhoodOptions } from 'lib/utils/zip';
import { useAuth } from 'hooks/useAuth';

import Page from 'components/layouts/Page';
import ServiceFormLocation from 'containers/ServiceFormLocation';
import GroceryFormDate from 'containers/GroceryFormDate';
import GroceryFormItems from 'containers/GroceryFormItems';
import { ErrorContext } from 'state/ErrorProvider';

import { nyczipmap } from 'data/nyczipmap';

function ServiceGrocery({ backend, step }) {
  const { t } = useTranslation();
  const [request, setRequest] = useState(null);
  const [neighborhoodOptions, setNeighborhoodOptions] = useState();
  const { isInitializing } = useAuth();
  const params = useParams();
  const { hasError, setError } = useContext(ErrorContext);

  const updateService = async (request) =>
    await backend.updateServiceRequest(params.id, request, true).catch((e) => {
      setError(e.message);
    });

  useEffect(() => {
    if (!params.id || !!hasError) {
      return;
    }
    backend.getServiceRequest(params.id).then((data) => {
      setRequest(data);
    });
  }, [hasError, backend, params.id]);

  useEffect(() => {
    if (isInitializing) {
      return;
    }
    backend
      .getServiceUser()
      .then(({ data }) => {
        setNeighborhoodOptions(buildNeighborhoodOptions(nyczipmap[data.zip]));
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [backend, isInitializing, setError]);

  if (params.id && !request) {
    // loading
    return null;
  }

  return (
    <Page currentProgress={4} totalProgress={5}>
      {step === 1 && (
        <ServiceFormLocation
          request={request}
          onSave={updateService}
          neighborhoodOptions={neighborhoodOptions}
          nextUrl={routeWithParams(Routes.SERVICE_GROCERIES_WHEN, {
            id: params.id,
          })}
          title={t('service.grocery.where.title')}
        />
      )}
      {step === 2 && (
        <GroceryFormDate
          request={request}
          onSave={updateService}
          id={params.id}
        />
      )}
      {step === 3 && (
        <GroceryFormItems
          request={request}
          onSave={updateService}
          id={params.id}
        />
      )}
    </Page>
  );
}

export default ServiceGrocery;
