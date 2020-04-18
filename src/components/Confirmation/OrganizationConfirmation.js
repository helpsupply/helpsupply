/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import Anchor, { anchorTypes } from 'components/Anchor';

import styles from './ServiceConfirmation.styles';

export const OrganizationConfirmation = ({ organization }) => {
  const { t } = useTranslation();
  const organizationEmail = 'email@organization.com';
  const organizationWebsite = 'organizationwebsite.com';

  return (
    <div css={styles.organization}>
      <Text css={styles.organizationSubtitle} type={TEXT_TYPE.NOTE}>
        {t('request.serviceConfirmation.fulfilledBy')}
      </Text>
      <Text as="p" css={styles.organizationName}>
        {organization}
      </Text>
      <Text as="p" type={TEXT_TYPE.NOTE}>
        <Anchor href={`mailto:${organizationEmail}`} as={anchorTypes.A}>
          {organizationEmail}
        </Anchor>
      </Text>
      <Text as="p" type={TEXT_TYPE.NOTE}>
        <Anchor
          href={`http://${organizationWebsite}`}
          as={anchorTypes.A}
          isExternalLink
        >
          {organizationWebsite}
        </Anchor>
      </Text>
    </div>
  );
};

export default OrganizationConfirmation;
