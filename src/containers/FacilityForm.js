/** @jsx jsx */
import { useState, useCallback, useEffect } from 'react';
import { jsx } from '@emotion/core';
import Form from 'components/Form';
import InputText from 'components/InputText';
import InputDropdown from 'components/InputDropdown';
import Anchor from 'components/Anchor';
import Note from 'components/Note';
import states from 'data/states';
import FacilityConfirmation from 'components/FacilityConfirmation';

function FacilityForm({ backend, history }) {
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
      buttonLabel="Submit"
      onSubmit={handleSubmit}
      title="Add a new facility"
      disabled={!Object.keys(requiredFields).every((key) => !!fields[key])}
      description="Enter some information about your facility."
    >
      <InputText
        name="name"
        label="Name of the facility"
        value={dropSiteFacilityName}
        customOnChange={handleFieldChange('dropSiteFacilityName')}
      />
      <InputText
        name="zip"
        label="Zip code"
        value={dropSiteZip}
        customOnChange={handleFieldChange('dropSiteZip')}
      />
      <div css={{ display: 'flex', '> *': { width: '50%' } }}>
        <InputText
          name="city"
          label="City"
          value={dropSiteCity}
          customOnChange={handleFieldChange('dropSiteCity')}
        />
        <InputDropdown
          name="state"
          placeholder="State"
          value={dropSiteState}
          options={states}
          customOnChange={handleFieldChange('dropSiteState')}
        />
      </div>
      <InputText
        name="address"
        label="Full Street Address"
        value={dropSiteAddress}
        customOnChange={handleFieldChange('dropSiteAddress')}
      />
      <InputText
        name="url"
        label="Website URL (optional)"
        isRequired={false}
        value={dropSiteUrl}
        customOnChange={handleFieldChange('dropSiteUrl')}
      />
      <Note>
        If you’re working from a temporary facility, email us at{' '}
        <Anchor href="mailto:help@help.supply">help@help.supply</Anchor>
      </Note>
    </Form>
  );
}

export default FacilityForm;
