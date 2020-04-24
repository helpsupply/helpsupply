/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import { Emails } from 'constants/Emails';
import { formatPhoneNumber, capitalize } from 'lib/utils/strings';
import { TEXT_TYPE } from 'components/Text/constants';

import Text from 'components/Text';
import Note from 'components/Note';
import Anchor, { anchorTypes } from 'components/Anchor';
import { PrimaryButton } from 'components/Button';
import Loader from 'components/Loader';
import SubRow from 'components/Confirmation/SubRow';

import OpenServiceRequests from 'components/Dashboard/OpenServiceRequests';

import { styles } from './UserDashboard.styles';

export const UserDashboard = ({
  contact,
  handleUpdateContact,
  handleRequestService,
  isRequestsLoading,
  onDelete,
  onEdit,
  openRequests = [],
}) => {
  const { t } = useTranslation();
  const contactDetails = contact && (
    <div css={styles.contact}>
      <div>
        {contact.firstName} {contact.lastName}
      </div>
      <div>{formatPhoneNumber(contact.phone)}</div>
      <div>
        {capitalize(contact.contactPreference)} {t('dashboard.preferred')}
      </div>
      <div>
        {capitalize(contact.languagePreference)} {t('dashboard.preferred')}
      </div>
    </div>
  );

  return (
    <Fragment>
      <div css={styles.contentContainer}>
        <Text
          css={[styles.name, styles.section]}
          as="h2"
          type={TEXT_TYPE.HEADER_3}
        >
          {t('dashboard.title')}
        </Text>
        <SubRow
          onClick={handleUpdateContact}
          editLabel={t('global.form.changeLabel')}
          label={t('dashboard.contact.title')}
          details={contactDetails}
        />
        <div>
          <PrimaryButton css={styles.button} onClick={handleRequestService}>
            <Text>{t('dashboard.cta')}</Text>
          </PrimaryButton>
        </div>
        <Text css={styles.requestsHeader} as="h3" type={TEXT_TYPE.HEADER_4}>
          {t('dashboard.openRequests.title')}
          <span css={styles.number}>{openRequests.length}</span>
        </Text>
      </div>
      <div css={styles.requestsContainer}>
        {isRequestsLoading && <Loader passedStyles={styles.loader} />}
        {!isRequestsLoading && (
          <OpenServiceRequests
            onEdit={onEdit}
            onDelete={onDelete}
            requests={openRequests}
          />
        )}
        <div css={styles.footer}>
          <Note>
            {t('dropsite.footer.content')}{' '}
            <Anchor href={`mailto:${Emails.HELP}`} as={anchorTypes.A}>
              {Emails.HELP}
            </Anchor>
            .
          </Note>
        </div>
      </div>
    </Fragment>
  );
};

export default UserDashboard;
