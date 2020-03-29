/** @jsx jsx */
import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';

import { Emails } from 'lib/constants';

import Form from 'components/Form';
import InputText from 'components/InputText';
import InputDropdown from 'components/InputDropdown';
import Anchor from 'components/Anchor';
import Note from 'components/Note';
import states from 'data/states';
import FacilityConfirmation from 'components/FacilityConfirmation';

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
      <Form onSubmit={() => history.push(`/signup/${dropSiteId}`)}>
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

  return (
    <Form
      defaultValues={fields}
      buttonLabel={t('request.facilityForm.submit')}
      onSubmit={handleSubmit}
      title={t('request.facilityForm.title')}
      disabled={!Object.keys(requiredFields).every((key) => !!fields[key])}
      description={t('request.facilityForm.description')}
    >
      <InputText
        name="name"
        label={t('request.facilityForm.dropSiteFacilityName.label')}
        value={dropSiteFacilityName}
        customOnChange={handleFieldChange('dropSiteFacilityName')}
      />
      <InputText
        name="zip"
        label={t('request.facilityForm.dropSiteZip.label')}
        value={dropSiteZip}
        customOnChange={handleFieldChange('dropSiteZip')}
      />
      <div css={{ display: 'flex', '> *': { width: '50%' } }}>
        <InputText
          name="city"
          label={t('request.facilityForm.dropSiteCity.label')}
          value={dropSiteCity}
          customOnChange={handleFieldChange('dropSiteCity')}
        />
        <InputDropdown
          name="state"
          label={t('request.facilityForm.dropSiteState.label')}
          value={dropSiteState}
          options={states}
          customOnChange={handleFieldChange('dropSiteState')}
        />
      </div>
      <InputText
        name="address"
        label={t('request.facilityForm.dropSiteAddress.label')}
        value={dropSiteAddress}
        customOnChange={handleFieldChange('dropSiteAddress')}
      />
      <InputText
        name="url"
        label={t('request.facilityForm.dropSiteUrl.label')}
        isRequired={false}
        value={dropSiteUrl}
        customOnChange={handleFieldChange('dropSiteUrl')}
      />
      <Note>
        {t('request.facilityForm.emailAt') + ' '}
        <Anchor href={`mailto:${Emails.HELP}`}>{Emails.HELP}</Anchor>
      </Note>
    </Form>
  );
}

export default FacilityForm;
