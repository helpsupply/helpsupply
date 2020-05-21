/** @jsx jsx */
import { useCallback, useState, useContext } from 'react';
import { jsx, css } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ErrorContext } from 'state/ErrorProvider';
import { StateContext } from 'state/StateProvider';

import { Routes } from 'lib/constants/routes';
import { routeWithParams } from 'lib/utils/routes';
import RequestKinds from 'lib/organizations/kinds';
import { paymentOptions } from 'lib/constants/payment';
import { Color, Space } from 'lib/theme';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

const styles = {
  note: css({ color: Color.GRAY_50, marginTop: Space.S20 }),
};

export const ServicePaymentForm = ({ request, onSave }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { setError } = useContext(ErrorContext);
  const { state } = useContext(StateContext);

  const [fields, setFields] = useState({
    payment: undefined,
    needsFinances: false,
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

  const handleSubmit = async () => {
    const { kind, id } = request;
    setIsLoading(true);
    onSave(fields)
      .then(() => {
        switch (kind) {
          case RequestKinds.GROCERY:
            history.push(
              state.editServiceUrl ||
                routeWithParams(Routes.SERVICE_GROCERIES_WHERE, {
                  id,
                }),
            );
            break;
          case RequestKinds.CHILDCARE:
            history.push(
              state.editServiceUrl ||
                routeWithParams(Routes.SERVICE_CHILDCARE_WHERE, {
                  id,
                }),
            );
            break;
          case RequestKinds.PETCARE:
            history.push(
              state.editServiceUrl ||
                routeWithParams(Routes.SERVICE_PETCARE_WHERE, {
                  id,
                }),
            );
            break;
          case RequestKinds.MENTALHEALTH:
            history.push(
              state.editServiceUrl ||
                routeWithParams(Routes.SERVICE_EMOTIONAL_WHEN, {
                  id,
                }),
            );
            break;
          default:
            history.push(routeWithParams(Routes.SERVICE_TYPE));
            break;
        }
      })
      .catch((e) => {
        setError(e.message);
        setIsLoading(false);
      });
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('payment'),
      defaultValue: fields.payment,
      label: t('service.selectType.form.serviceTypeLabel'),
      options: paymentOptions,
      name: 'payment',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.payment,
    },
    {
      customOnChange: handleFieldChange('needsFinances'),
      label: t('service.selectType.form.needsFinances'),
      name: 'needsFinances',
      type: formFieldTypes.INPUT_CHECKBOX,
      value: fields.needsFinances,
    },
  ];

  const { needsFinances, ...requiredFields } = fields;

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.paymentForm.title')}
      description={t('service.paymentForm.description')}
      disabled={!Object.keys(requiredFields).every((key) => !!fields[key])}
      fields={fieldData}
      isLoading={isLoading}
      buttonLabel={t('global.form.submitLabelNext')}
    >
      <Text css={styles.note} as="div" type={TEXT_TYPE.NOTE}>
        {t('service.paymentForm.note')}
      </Text>
    </FormBuilder>
  );
};

export default ServicePaymentForm;
