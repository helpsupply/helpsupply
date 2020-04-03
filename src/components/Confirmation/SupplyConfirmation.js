/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { PrimaryButton } from 'components/Button';

import SubCta from './SubCta';
import SubRow from './SubRow';
import ConfirmationWrapper from './ConfirmationWrapper';

import styles from './SupplyConfirmation.styles';

function SupplyConfirmation() {
  const history = useHistory();
  const params = useParams();

  const { t } = useTranslation();

  const handleOnEditClick = () => {
    history.push(
      routeWithParams(Routes.SUPPLY_NEW_ADMIN, {
        id: params.id,
      }),
    );
  };

  const handleOnPrimaryCtaClick = () => {
    history.push(
      routeWithParams(Routes.SUPPLY_NEW_ADMIN, {
        id: params.id,
      }),
    );
  };

  return (
    <ConfirmationWrapper title={t('request.supplyConfirmation.header')}>
      <SubRow
        onClick={handleOnEditClick}
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

      <SubCta
        href={routeWithParams(Routes.DROPSITE_DETAIL, {
          id: params.id,
        })}
        passedStyles={styles.subCta}
        message={t('request.supplyConfirmation.subSection.subCta')}
      />

      <PrimaryButton
        type="submit"
        onClick={handleOnPrimaryCtaClick}
        css={styles.button}
      >
        <Text type={TEXT_TYPE.BODY_1}>
          {t('request.supplyConfirmation.submitLabel')}
        </Text>
      </PrimaryButton>
    </ConfirmationWrapper>
  );
}

export default SupplyConfirmation;
