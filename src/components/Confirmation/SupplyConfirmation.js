/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

import SubRow from './SubRow';
import ConfirmationWrapper from './ConfirmationWrapper';

function SupplyConfirmation({ onEdit }) {
  const { t } = useTranslation();

  return (
    <ConfirmationWrapper title={t('request.supplyConfirmation.header')}>
      <SubRow
        onClick={onEdit}
        editLabel={t('generic.form.changeLabel')}
        label={`${t('request.supplyConfirmation.subText.note')} #1454`}
        details={
          <Fragment>
            <Text as="p">N95 Masks: 1,750</Text>

            <Text as="p" type={TEXT_TYPE.BODY_2}>
              {t('request.supplyConfirmation.message')}
            </Text>
          </Fragment>
        }
      />
    </ConfirmationWrapper>
  );
}

export default SupplyConfirmation;
