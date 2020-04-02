/** @jsx jsx */
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { Emails } from 'constants/Emails';

import states from 'data/states';
import { useStateValue, actions } from 'state/StateProvider';

import Anchor, { anchorTypes } from 'components/Anchor';
import Note from 'components/Note';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

function FacilityForm({ backend, dropSite, dropSiteId }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useStateValue()[1];

  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    dropSiteFacilityName: dropSite?.dropSiteFacilityName || '',
    dropSiteZip: dropSite?.dropSiteZip || '',
    dropSiteAddress: dropSite?.dropSiteAddress || '',
    dropSiteCity: dropSite?.dropSiteCity || '',
    dropSiteState: dropSite?.dropSiteState || '',
    dropSiteUrl: dropSite?.dropSiteUrl || '',
  });

  const handleSubmit = () => {
    setIsLoading(true);

    if (dropSiteId) {
      return backend
        .editDropSite({ location_id: dropSiteId, ...fields })
        .then((data) => {
          dispatch({
            type: actions.ADD_PENDING_FACILITY,
            pendingFacility: { location_id: dropSiteId, ...fields },
          });
          history.push(Routes.FACILITY_CONFIRMATION);
        });
    }

    backend.addNewDropSite(fields).then((data) => {
      if (!data) {
        return;
      }

      dispatch({
        type: actions.ADD_PENDING_FACILITY,
        pendingFacility: { location_id: data, ...fields },
      });
      history.push(Routes.FACILITY_CONFIRMATION);
    });
  };

  const handleFieldChange = useCallback(
    (field) => (value) => {
      setFields((fields) => ({
        ...fields,
        [field]: value,
      }));
    },
    [],
  );

  const { dropSiteUrl, ...requiredFields } = fields;
  const {
    dropSiteFacilityName,
    dropSiteAddress,
    dropSiteCity,
    dropSiteState,
    dropSiteZip,
  } = fields;

  const fieldData = [
    {
      customOnChange: handleFieldChange('dropSiteFacilityName'),
      label: t('request.facilityForm.dropSiteFacilityName.label'),
      name: 'dropSiteFacilityName',
      type: formFieldTypes.INPUT_TEXT,
      value: dropSiteFacilityName,
    },
    {
      customOnChange: handleFieldChange('dropSiteZip'),
      label: t('request.facilityForm.dropSiteZip.label'),
      name: 'dropSiteZip',
      type: formFieldTypes.INPUT_TEXT,
      value: dropSiteZip,
    },
    {
      customOnChange: handleFieldChange('dropSiteCity'),
      isHalfWidth: true,
      label: t('request.facilityForm.dropSiteCity.label'),
      name: 'dropSiteCity',
      type: formFieldTypes.INPUT_TEXT,
      value: dropSiteCity,
    },
    {
      customOnChange: handleFieldChange('dropSiteState'),
      isHalfWidth: true,
      label: t('request.facilityForm.dropSiteState.label'),
      options: states,
      name: 'dropSiteState',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: dropSiteState,
    },
    {
      customOnChange: handleFieldChange('dropSiteAddress'),
      label: t('request.facilityForm.dropSiteAddress.label'),
      name: 'dropSiteAddress',
      type: formFieldTypes.INPUT_TEXT,
      value: dropSiteAddress,
    },
    {
      customOnChange: handleFieldChange('dropSiteUrl'),
      isRequired: false,
      label: t('request.facilityForm.dropSiteUrl.label'),
      name: 'dropSiteUrl',
      type: formFieldTypes.INPUT_TEXT,
      value: dropSiteUrl,
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      description={t('request.facilityForm.description')}
      disabled={!Object.keys(requiredFields).every((key) => !!fields[key])}
      onSubmit={() => handleSubmit(fields)}
      title={t('request.facilityForm.title')}
      fields={fieldData}
      isLoading={isLoading}
    >
      <Note key="note">
        {t('request.facilityForm.emailAt') + ' '}
        <Anchor href={`mailto:${Emails.HELP}`} as={anchorTypes.A}>
          {Emails.HELP}
        </Anchor>
      </Note>
    </FormBuilder>
  );
}

export default FacilityForm;
