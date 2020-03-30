/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import Text from 'components/Text';

import Card from 'components/Card';
import ConfirmationWrapper from './ConfirmationWrapper';

function FacilityConfirmation({ onEdit, name, address }) {
  const { t } = useTranslation();

  return (
    <ConfirmationWrapper title={t('request.facilityAdded.title')}>
      <Card
        onClick={onEdit}
        editLabel={t('generic.form.changeLabel')}
        label={t('request.facilityAdded.newFacility')}
        details={
          <Fragment>
            <Text as="p">{name}</Text>
            <Text as="p">{address}</Text>
          </Fragment>
        }
      />
    </ConfirmationWrapper>
  );
}

export default FacilityConfirmation;
