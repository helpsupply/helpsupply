/** @jsx jsx */
import { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import { StateContext } from 'state/StateProvider';

function GroceryFormItems({ id, onSave, request }) {
  const history = useHistory();
  const { t } = useTranslation();

  const { state } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    dietaryRestrictions: '',
    groceryList: '',
  });
  const handleFieldChange = useCallback(
    (field) => (value) => {
      setFields((fields) => ({
        ...fields,
        [field]: value,
      }));
    },
    [],
  );

  const { dietaryRestrictions, ...requiredFields } = fields;

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await onSave(fields);
    if (!res) {
      setIsLoading(false);
      return;
    }
    const url =
      state.editServiceUrl ||
      routeWithParams(Routes.SERVICE_ADDITIONAL_INFO, { id });
    history.push(url);
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('groceryList'),
      label: t('service.grocery.what.labels.groceryList'),
      name: 'groceryList',
      type: formFieldTypes.TEXT_AREA,
      value: fields.groceryList,
    },
    {
      customOnChange: handleFieldChange('dietaryRestrictions'),
      isRequired: false,
      label: t('service.grocery.what.labels.dietaryRestrictions'),
      name: 'dietaryRestrictions',
      type: formFieldTypes.INPUT_TEXT,
      value: fields.dietaryRestrictions,
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.grocery.what.title')}
      description={t('service.grocery.what.description')}
      disabled={!Object.keys(requiredFields).every((key) => !!fields[key])}
      fields={fieldData}
      isLoading={isLoading}
      buttonLabel={t('global.form.submitLabelNext')}
    />
  );
}

export default GroceryFormItems;
