/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase/app';
import 'firebase/auth';

import { formatPhoneNumber, capitalize } from 'lib/utils/strings';

import { TEXT_TYPE } from 'components/Text/constants';
import Text from 'components/Text';
import { PrimaryButton, SecondaryButton } from 'components/Button';
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
    <Text as="div" type={TEXT_TYPE.BODY_3} css={styles.contact}>
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
    </Text>
  );

  const handleSignout = () => {
    firebase.auth().signOut();
  };

  return (
    <Fragment>
      <div css={styles.contentContainer}>
        <Text
          css={[styles.name, styles.section]}
          as="h2"
          type={TEXT_TYPE.CONTENT_HEADER}
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
          <SecondaryButton css={styles.signoutBtn} onClick={handleSignout}>
            <Text>{t('dashboard.signout')}</Text>
          </SecondaryButton>
        </div>
        <div>
          <PrimaryButton css={styles.requestBtn} onClick={handleRequestService}>
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
      </div>
    </Fragment>
  );
};

export default UserDashboard;
