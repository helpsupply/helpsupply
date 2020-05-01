/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import Anchor, { anchorTypes } from 'components/Anchor';

import styles from './ServiceConfirmation.styles';

export const OrganizationConfirmation = ({ organization }) => {
  const { t } = useTranslation();

  return (
    <div css={styles.organization}>
      <Text css={styles.organizationSubtitle} type={TEXT_TYPE.NOTE}>
        {t('service.confirmation.fulfilledBy')}
      </Text>
      <Text as="p" css={styles.organizationName}>
        {organization.name}
      </Text>
      {organization.email && (
        <Text as="p" type={TEXT_TYPE.NOTE}>
          <Anchor href={`mailto:${organization.email}`} as={anchorTypes.A}>
            {organization.email}
          </Anchor>
        </Text>
      )}
      <Text as="p" type={TEXT_TYPE.NOTE}>
        <Anchor
          href={`http://${organization.website}`}
          as={anchorTypes.A}
          isExternalLink
        >
          {organization.website}
        </Anchor>
      </Text>
    </div>
  );
};

export default OrganizationConfirmation;
