/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { Routes } from 'constants/Routes';
import { Emails } from 'constants/Emails';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import Note from 'components/Note';
import Anchor from 'components/Anchor';
import Card from 'components/Card';
import { PrimaryButton } from 'components/Button';
import Requests from './Requests';

import { styles } from './DropSiteAdmin.styles';

export const DropSiteAdmin = ({
  dropSiteAddress,
  dropSiteDescription,
  dropSiteFacilityName,
  dropSiteName,
  dropSitePhone,
  requests,
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
      <Text css={styles.name} as="h2" type={TEXT_TYPE.HEADER_3}>
        {dropSiteFacilityName}
      </Text>
      <Card
        label="Drop-off location"
        details={locationDetails}
        editLabel="Change"
      />
      <Card label="Contact info" details={contactDetails} editLabel="Change" />
      <PrimaryButton
        css={styles.button}
        onClick={() => (window.location.href = Routes.REQUEST_SUPPLIES)}
      >
        <Text>{t('dropsite.requestSuppliesButton.label')}</Text>
      </PrimaryButton>
      <Text css={styles.requestsHeader} as="h3" type={TEXT_TYPE.HEADER_4}>
        {t('dropsite.openRequests.title')}
        <span css={styles.number}>4</span>
      </Text>
      <div css={styles.requestsContainer}>
        <Requests requests={requests} />
        <div css={styles.footer}>
          <Note>
            {t('dropsite.footer.content')}{' '}
            <Anchor href={`mailto:${Emails.HELP}`}>{Emails.HELP}</Anchor>.
          </Note>
        </div>
      </div>
    </Fragment>
  );
};

export default DropSiteAdmin;
