/** @jsx jsx */
import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';

import { Emails } from 'constants/Emails';
import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import states from 'data/states';

import Form from 'components/Form';
import Anchor from 'components/Anchor';
import Note from 'components/Note';
import { FacilityConfirmation } from 'components/Confirmation';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

function FacilityForm({ backend, history }) {
  const { t } = useTranslation();
  const [dropSiteId, setDropSiteId] = useState('');
  const [fields, setFields] = useState({
    dropSiteFacilityName: '',
    dropSiteZip: '',
    dropSiteAddress: '',
    dropSiteCity: '',
    dropSiteState: '',
    dropSiteUrl: '',
  });

  useEffect(() => {
    if (dropSiteId) {
      backend.getDropSites(dropSiteId).then((data) => {
        if (!data) {
          return;
        }
        setFields(data);
      });
    }
  }, [backend, dropSiteId]);

  const handleFieldChange = useCallback(
    (field) => (value) => {
      setFields((fields) => ({
        ...fields,
        [field]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    backend.addNewDropSite(fields).then((data) => {
      if (!data) {
        return;
      }
      setDropSiteId(data);
    });
  }, [backend, fields]);

  const { dropSiteUrl, ...requiredFields } = fields;
  const {
    dropSiteFacilityName,
    dropSiteAddress,
    dropSiteCity,
    dropSiteState,
    dropSiteZip,
  } = fields;

  if (dropSiteId) {
    return (
      <Form
        onSubmit={() =>
          history.push(
            routeWithParams(Routes.SIGNUP_DROPSITE, { dropsite: dropSiteId }),
          )
        }
      >
        <FacilityConfirmation
          name={dropSiteFacilityName}
          address={[
            dropSiteAddress,
            dropSiteCity,
            dropSiteState,
            dropSiteZip,
          ].join(', ')}
        />
      </Form>
    );
  }

  const fieldData = [
    {
      customOnChange: handleFieldChange('dropSiteFacilityName'),
      label: t('request.facilityForm.dropSiteFacilityName.label'),
      name: 'name',
      type: formFieldTypes.INPUT_TEXT,
      value: dropSiteFacilityName,
    },
    {
      customOnChange: handleFieldChange('dropSiteZip'),
      label: t('request.facilityForm.dropSiteZip.label'),
      name: 'zip',
      type: formFieldTypes.INPUT_TEXT,
      value: dropSiteZip,
    },
    {
      customOnChange: handleFieldChange('dropSiteCity'),
      isHalfWidth: true,
      label: t('request.facilityForm.dropSiteCity.label'),
      name: 'city',
      type: formFieldTypes.INPUT_TEXT,
      value: dropSiteCity,
    },
    {
      customOnChange: handleFieldChange('dropSiteState'),
      isHalfWidth: true,
      label: t('request.facilityForm.dropSiteState.label'),
      options: states,
      name: 'state',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: dropSiteState,
    },
    {
      customOnChange: handleFieldChange('dropSiteAddress'),
      label: t('request.facilityForm.dropSiteAddress.label'),
      name: 'address',
      type: formFieldTypes.INPUT_TEXT,
      value: dropSiteAddress,
    },
    {
      customOnChange: handleFieldChange('dropSiteUrl'),
      isRequired: false,
      label: t('request.facilityForm.dropSiteUrl.label'),
      name: 'url',
      type: formFieldTypes.INPUT_TEXT,
      value: dropSiteUrl,
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      description={t('request.facilityForm.description')}
      disabled={!Object.keys(requiredFields).every((key) => !!fields[key])}
      onSubmit={handleSubmit}
      title={t('request.facilityForm.title')}
      fields={fieldData}
    >
      <Note key="note">
        {t('request.facilityForm.emailAt') + ' '}
        <Anchor href={`mailto:${Emails.HELP}`}>{Emails.HELP}</Anchor>
      </Note>
    </FormBuilder>
  );
}

export default FacilityForm;
