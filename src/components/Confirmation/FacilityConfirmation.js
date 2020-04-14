/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import Text from 'components/Text';

import SubRow from './SubRow';
import ConfirmationWrapper from './ConfirmationWrapper';

function FacilityConfirmation({
  onEdit,
  name,
  streetAddress,
  city,
  state,
  zip,
}) {
  const { t } = useTranslation();

  return (
    <ConfirmationWrapper title={t('request.facilityAdded.title')}>
      <SubRow
        onClick={onEdit}
        editLabel={t('global.form.changeLabel')}
        label={t('request.facilityAdded.newFacility')}
        details={
          <Fragment>
            <Text as="p">{name}</Text>
            <Text as="p">
              {streetAddress}
              <br />
              {`${city}, ${state}  ${zip}`}
            </Text>
          </Fragment>
        }
      />
    </ConfirmationWrapper>
  );
}

export default FacilityConfirmation;
