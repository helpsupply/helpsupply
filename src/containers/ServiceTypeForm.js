/** @jsx jsx */
import { Fragment, useEffect, useCallback, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx, css } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { Routes } from 'constants/Routes';
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
import { ErrorContext } from 'state/ErrorProvider';
import { StateContext } from 'state/StateProvider';

const styles = {
  hideNote: css({
    display: 'none',
  }),
  showNote: css({
    display: 'block',
  }),
};

function ServiceTypeForm({
  backend,
  id,
  onSave,
  request,
  serviceOptions,
  zip,
}) {
  const history = useHistory();
  const { t } = useTranslation();
  const { setError } = useContext(ErrorContext);
  const { state } = useContext(StateContext);

  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [noteContent, setNoteContent] = useState();
  const [fields, setFields] = useState({
    kind: '',
    urgency: '',
    organization: '',
    zip: '',
  });

  useEffect(() => {
    setFields((fields) => ({
      ...fields,
      zip,
    }));
  }, [zip]);

  const handleShowContent = (value) => {
    setShowContent(true);
    switch (value) {
      case RequestKinds.GROCERY:
        setNoteContent(
          <Fragment>
            <Note>
              We cannot guarantee a quick response. If you are in immediate
              crisis, please explore these other options in addition to making a
              Help Supply request.
            </Note>
            <div css={{ marginBottom: Space.S20 }}>
              <Anchor
                href={`https://www.cityharvest.org/`}
                as={anchorTypes.A}
                isExternalLink
              >
                City Harvest
              </Anchor>
            </div>
            <div>
              <Anchor
                href={`https://www.foodbanknyc.org/`}
                as={anchorTypes.A}
                isExternalLink
              >
                Food Bank NYC
              </Anchor>
            </div>
          </Fragment>,
        );
        break;
      case RequestKinds.CHILDCARE:
        setNoteContent(
          <Note>
            We cannot guarantee a quick response. If you are in immediate
            crisis, please explore these other options in addition to making a
            Help Supply request.
          </Note>,
        );
        break;
      case RequestKinds.PETCARE:
        setNoteContent(null);
        break;
      case RequestKinds.MENTALHEALTH:
        setNoteContent(
          <Fragment>
            <Note>
              We cannot guarantee a quick response. If you are in crisis, or
              feel likely to hurt yourself or others, please call 1.888.692.9355
              to talk to someone now, or text “WELL” to 65713.
            </Note>
            <div css={{ marginBottom: Space.S20 }}>
              <Anchor
                href={`https://nycwell.cityofnewyork.us/`}
                as={anchorTypes.A}
                isExternalLink
              >
                NYC Well
              </Anchor>
            </div>
          </Fragment>,
        );
        break;
      default:
        setShowContent(false);
        break;
    }
  };

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
    [serviceOptions],
  );

  const handleSubmit = async () => {
    const { kind } = fields;
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
          switch (kind) {
            case RequestKinds.GROCERY:
              history.push(
                routeWithParams(Routes.SERVICE_GROCERIES_WHERE, {
                  id,
                }),
              );
              break;
            case RequestKinds.CHILDCARE:
              history.push(
                routeWithParams(Routes.SERVICE_CHILDCARE_WHERE, {
                  id,
                }),
              );
              break;
            case RequestKinds.PETCARE:
              history.push(
                routeWithParams(Routes.SERVICE_PETCARE_WHERE, {
                  id,
                }),
              );
              break;
            case RequestKinds.MENTALHEALTH:
              history.push(
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
    }
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('kind'),
      label: t('service.selectType.form.serviceTypeLabel'),
      options: serviceOptions,
      name: 'kind',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.kind,
    },
    {
      customOnChange: handleFieldChange('urgency'),
      label: t('service.selectType.form.urgencyLabel'),
      options: buildUrgencyOptions(),
      name: 'urgency',
      type: formFieldTypes.INPUT_DROPDOWN,
      value: fields.urgency,
    },
  ];

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
      disabled={!Object.keys(fields).every((key) => !!fields[key])}
      fields={fieldData}
      isLoading={isLoading}
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
}

export default ServiceTypeForm;
