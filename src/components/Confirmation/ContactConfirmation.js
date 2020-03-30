/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import Text from 'components/Text';
import Card from 'components/Card';

import ConfirmationWrapper from './ConfirmationWrapper';

function ContactConfirmation({ name, contact, onEdit }) {
  const { t } = useTranslation();
  return (
    <ConfirmationWrapper title={t('request.dropSiteContactForm.sent.title')}>
      <Card
        onClick={onEdit}
        editLabel={t('generic.form.changeLabel')}
        label={t('request.dropSiteContactForm.title')}
        details={
          <Fragment>
            <Text as="p">{name}</Text>
            <Text as="p">{contact}</Text>
          </Fragment>
        }
      ></Card>
    </ConfirmationWrapper>
  );
}

export default ContactConfirmation;
