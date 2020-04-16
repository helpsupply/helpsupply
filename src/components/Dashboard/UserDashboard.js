/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import { Emails } from 'constants/Emails';
import { TEXT_TYPE } from 'components/Text/constants';

import Text from 'components/Text';
import Note from 'components/Note';
import Anchor, { anchorTypes } from 'components/Anchor';
import Card from 'components/Card';
import { PrimaryButton } from 'components/Button';
import Loader from 'components/Loader';

import OpenServiceRequests from 'components/Dashboard/OpenServiceRequests';

import { styles } from './UserDashboard.styles';

export const UserDashboard = ({
  handleUpdateContact,
  handleRequestSupplies,
  isRequestsLoading,
  onDelete,
  onEdit,
  openRequests = [],
}) => {
  const { t } = useTranslation();
  const contactDetails = (
    <Fragment>
      name
      <br />
      phone
    </Fragment>
  );

  return (
    <Fragment>
      <Text
        css={[styles.name, styles.section]}
        as="h2"
        type={TEXT_TYPE.HEADER_3}
      >
        {t('dashboard.title')}
      </Text>
      <Card
        onClick={handleUpdateContact}
        label={t('dashboard.contact.title')}
        details={contactDetails}
        editLabel={t('global.form.changeLabel')}
      />
      <PrimaryButton css={styles.button} onClick={handleRequestSupplies}>
        <Text>{t('dashboard.cta')}</Text>
      </PrimaryButton>
      <Text css={styles.requestsHeader} as="h3" type={TEXT_TYPE.HEADER_4}>
        {t('dashboard.openRequests.title')}
        <span css={styles.number}>{openRequests.length}</span>
      </Text>
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
