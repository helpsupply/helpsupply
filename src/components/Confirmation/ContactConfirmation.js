/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';

import { TEXT_TYPE } from 'components/Text/constants';

import Text from 'components/Text';
import { PrimaryButton } from 'components/Button';

import SubRow from './SubRow';
import ConfirmationWrapper from './ConfirmationWrapper';

import styles from './ContactConfirmation.styles';

function ContactConfirmation({ name, contact, onCtaClick, onEdit }) {
  const history = useHistory();
  const params = useParams();
  const { t } = useTranslation();

  const handleOnCtaClick = () => {
    history.push(
      routeWithParams(Routes.DROPSITE_ADMIN, {
        id: params.id,
      }),
    );
  };

  return (
    <ConfirmationWrapper title={t('request.dropSiteContactForm.sent.title')}>
      <SubRow
        onClick={onEdit}
        editLabel={t('generic.form.changeLabel')}
        label={t('request.dropSiteContactForm.title')}
        details={
          <Fragment>
            <Text as="p">{name}</Text>
            <Text as="p">{contact}</Text>
          </Fragment>
        }
      />

      <PrimaryButton
        type="submit"
        css={styles.button}
        onClick={handleOnCtaClick}
      >
        <Text type={TEXT_TYPE.BODY_1}>
          {t('request.dropSiteContactForm.sent.button.label')}
        </Text>
      </PrimaryButton>
    </ConfirmationWrapper>
  );
}

export default ContactConfirmation;
