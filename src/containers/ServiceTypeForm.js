/** @jsx jsx */
import { Fragment, useEffect, useCallback, useState, useContext } from 'react';
import { jsx, css } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

import { ErrorContext } from 'state/ErrorProvider';
import { StateContext } from 'state/StateProvider';

import { Routes } from 'lib/constants/routes';
import { routeWithParams } from 'lib/utils/routes';
import RequestKinds from 'lib/organizations/kinds';
import { buildUrgencyOptions } from 'lib/utils/urgency';
import { Space } from 'lib/theme';

import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';
import Anchor, { anchorTypes } from 'components/Anchor';
import Note from 'components/Note';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

const styles = {
  hideNote: css({
    display: 'none',
  }),
  showNote: css({
    display: 'block',
  }),
  link: css({
    alignItems: 'baseline',
    display: 'flex',
  }),
  linkContainer: css({
    marginBottom: Space.S20,
  }),
};

export const ServiceTypeForm = ({
  backend,
  id,
  onSave,
  request,
  serviceOptions,
  zip,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { setError } = useContext(ErrorContext);
  const { state } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [noteContent, setNoteContent] = useState();

  const [fields, setFields] = useState({
    kind: undefined,
    urgency: undefined,
    organization: '',
    zip: '',
  });

  const handleShowContent = useCallback(
    (value) => {
      setShowContent(true);
      switch (value) {
        case RequestKinds.GROCERY:
          setNoteContent(
            <Fragment>
              <Note>{t('service.selectType.form.note.grocery.content')}</Note>
              <div css={styles.linkContainer}>
                <Anchor
                  href={`${t(
                    'service.selectType.form.note.grocery.cityHarvest.url',
                  )}`}
                  as={anchorTypes.A}
                  isExternalLink
                  css={styles.link}
                >
                  <Text type={TEXT_TYPE.NOTE}>
                    {t(
                      'service.selectType.form.note.grocery.cityHarvest.title',
                    )}
                  </Text>
                </Anchor>
              </div>
              <div>
                <Anchor
                  href={`${t(
                    'service.selectType.form.note.grocery.foodBankNyc.url',
                  )}`}
                  as={anchorTypes.A}
                  isExternalLink
                  css={styles.link}
                >
                  <Text type={TEXT_TYPE.NOTE}>
                    {t(
                      'service.selectType.form.note.grocery.foodBankNyc.title',
                    )}
                  </Text>
                </Anchor>
              </div>
            </Fragment>,
          );
          break;
        case RequestKinds.CHILDCARE:
          setNoteContent(
            <Note>{t('service.selectType.form.note.childcare.content')}</Note>,
          );
          break;
        case RequestKinds.PETCARE:
          // todo: add petcare note
          setNoteContent(null);
          break;
        case RequestKinds.MENTALHEALTH:
          setNoteContent(
            <Fragment>
              <Note>
                {t('service.selectType.form.note.mentalHealth.content')}
              </Note>
              <div css={styles.linkContainer}>
                <Anchor
                  href={`${t(
                    'service.selectType.form.note.mentalHealth.nycWell.url',
                  )}`}
                  as={anchorTypes.A}
                  isExternalLink
                  css={styles.link}
                >
                  <Text type={TEXT_TYPE.NOTE}>
                    {t(
                      'service.selectType.form.note.mentalHealth.nycWell.title',
                    )}
                  </Text>
                </Anchor>
              </div>
            </Fragment>,
          );
          break;
        default:
          setShowContent(false);
          break;
      }
    },
    [t],
  );

  useEffect(() => {
    setFields((fields) => ({
      ...fields,
      zip,
    }));
  }, [zip]);

  const handleFieldChange = useCallback(
    (field) => (value) => {
      if (field === 'kind') {
        const organization = serviceOptions.filter(
          (opt) => opt.value === value,
        )[0].organization;
        setFields((fields) => ({
          ...fields,
          [field]: value,
          organization,
        }));
        handleShowContent(value);
      } else {
        setFields((fields) => ({
          ...fields,
          [field]: value,
        }));
      }
    },
    [serviceOptions, handleShowContent],
  );

  const handleSubmit = async () => {
    setIsLoading(true);

    if (
      state.editServiceUrl &&
      id &&
      request &&
      request?.kind === fields.kind
    ) {
      history.push(state.editServiceUrl);
      const res = await onSave(fields);
      if (!res) {
        setIsLoading(false);
        return;
      }
      history.push(state.editServiceUrl);
    } else {
      backend
        .saveServiceRequest(fields)
        .then((id) => {
          history.push(
            routeWithParams(Routes.SERVICE_PAYMENT, {
              id,
            }),
          );
        })
        .catch((e) => {
          setError(e.message);
          setIsLoading(false);
        });
    }
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('kind'),
      defaultValue: fields.kind,
      label: t('service.selectType.form.serviceTypeLabel'),
      options: serviceOptions,
      name: 'kind',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.kind,
    },
    {
      customOnChange: handleFieldChange('urgency'),
      defaultValue: fields.urgency,
      label: t('service.selectType.form.urgencyLabel'),
      options: buildUrgencyOptions(),
      name: 'urgency',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.urgency,
    },
  ];

  const { ...requiredFields } = fields;

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={
        <ReactMarkdown
          source={t('service.selectType.title', {
            url: Routes.SERVICE_LOCATION_UPDATE,
            zip,
          })}
        />
      }
      description={t('service.selectType.description')}
      disabled={!Object.keys(requiredFields).every((key) => !!fields[key])}
      fields={fieldData}
      isLoading={isLoading}
      buttonLabel={t('global.form.submitLabelNext')}
    >
      <Text
        as="div"
        type={TEXT_TYPE.NOTE}
        css={[showContent && styles.showNote, !showContent && styles.hideNote]}
      >
        {noteContent}
      </Text>
    </FormBuilder>
  );
};

export default ServiceTypeForm;
