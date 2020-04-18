/** @jsx jsx */
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import Text from 'components/Text';
import { PrimaryButton } from 'components/Button';
import ServicesList from 'components/ServicesList';

import { Routes } from 'constants/Routes';

function AvailableServices() {
  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = () => {
    history.push(Routes.FACILITY);
  };

  return (
    <Fragment>
      <ServicesList />
      <PrimaryButton type="submit" onClick={handleSubmit}>
        <Text>{t('global.form.submitLabelNext')}</Text>
      </PrimaryButton>
    </Fragment>
  );
}

export default AvailableServices;
