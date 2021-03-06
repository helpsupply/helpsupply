/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { Routes } from 'lib/constants/routes';
import { LANGUAGES } from 'lib/constants/languages';
import { CONTACT_PREFERENCES } from 'lib/constants/contact';
import { routeWithParams } from 'lib/utils/routes';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { PrimaryButton } from 'components/Button';
import SubRow from 'components/SubRow';

import ConfirmationWrapper from '../ConfirmationWrapper';
import styles from './ContactConfirmation.styles';

const getPretty = (constant, slug) => {
  const target = constant.filter((lang) => {
    return lang.value === slug;
  })[0];

  if (!target) {
    return false;
  }

  return target.label;
};

function ContactConfirmation({ email, onEdit, serviceUser }) {
  const history = useHistory();
  const { t } = useTranslation();

  const handleOnCtaClick = () => {
    history.push(routeWithParams(Routes.SERVICE_TYPE));
  };

  const { data } = serviceUser;

  return (
    <ConfirmationWrapper title={t('service.contactConfirm.title')}>
      <SubRow
        onClick={onEdit}
        editLabel={t('global.form.changeLabel')}
        label={t('service.contactForm.title')}
        details={
          <Fragment>
            <Text as="p">
              {data.firstName} {data.lastName}
            </Text>
            <Text as="p">{email}</Text>
            {data.phone && <Text as="p">{data.phone}</Text>}
            {getPretty(CONTACT_PREFERENCES, data.contactPreference) && (
              <Text as="p">
                {getPretty(CONTACT_PREFERENCES, data.contactPreference)}{' '}
                {t('service.contactConfirm.sent.preferred')}
              </Text>
            )}
            {getPretty(LANGUAGES, data.languagePreference) && (
              <Text as="p">
                {getPretty(LANGUAGES, data.languagePreference)}{' '}
                {t('service.contactConfirm.sent.preferred')}
              </Text>
            )}
          </Fragment>
        }
      />

      <PrimaryButton
        type="submit"
        css={styles.button}
        onClick={handleOnCtaClick}
      >
        <Text type={TEXT_TYPE.BODY_1}>
          {t('service.contactConfirm.sent.buttonLabel')}
        </Text>
      </PrimaryButton>
    </ConfirmationWrapper>
  );
}

export default ContactConfirmation;
