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

import Requests from './Requests';

import { styles } from './DropSiteAdmin.styles';

export const DropSiteAdmin = ({
  dropSite: {
    dropSiteAddress,
    dropSiteDescription,
    dropSiteFacilityName,
    dropSiteName,
    dropSitePhone,
  },
  handleUpdateContact,
  handleUpdateLocation,
  handleRequestSupplies,
  isRequestsLoading,
  onDelete,
  requests = [],
}) => {
  const { t } = useTranslation();
  const locationDetails = (
    <Fragment>
      {dropSiteAddress}
      <br />
      {dropSiteDescription}
    </Fragment>
  );
  const contactDetails = (
    <Fragment>
      {dropSiteName}
      <br />
      {dropSitePhone}
    </Fragment>
  );

  return (
    <Fragment>
      <Text
        css={[styles.name, styles.section]}
        as="h2"
        type={TEXT_TYPE.HEADER_3}
      >
        {dropSiteFacilityName}
      </Text>
      <div css={styles.section}>
        <Card
          onClick={handleUpdateLocation}
          label={t('dropsite.details.title')}
          details={locationDetails}
          editLabel={t('generic.form.changeLabel')}
        />
      </div>
      <Card
        onClick={handleUpdateContact}
        label={t('dropsite.contact.title')}
        details={contactDetails}
        editLabel={t('generic.form.changeLabel')}
      />
      <PrimaryButton css={styles.button} onClick={handleRequestSupplies}>
        <Text>{t('dropsite.requestSuppliesButton.label')}</Text>
      </PrimaryButton>
      <Text css={styles.requestsHeader} as="h3" type={TEXT_TYPE.HEADER_4}>
        {t('dropsite.openRequests.title')}
        <span css={styles.number}>{requests.length}</span>
      </Text>
      <div css={styles.requestsContainer}>
        {isRequestsLoading && <Loader passedStyles={styles.loader} />}
        {!isRequestsLoading && (
          <Requests onDelete={onDelete} requests={requests} />
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

export default DropSiteAdmin;
