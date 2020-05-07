/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import { Emails } from 'lib/constants/emails';
import { Links } from 'lib/constants/links';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import Anchor, { anchorTypes } from 'components/Anchor';

import { styles } from './LearnMore.styles';

export const Contact = () => {
  const { t } = useTranslation();
  return (
    <div css={[styles.container, styles.contact]}>
      <Text css={styles.contactTitle} as="h2" type={TEXT_TYPE.HEADER_4}>
        {t('learnMore.contact.title')}
      </Text>
      <Text as="p" css={styles.contactContent} type={TEXT_TYPE.BODY_2}>
        {t('learnMore.contact.subtitle1')}
      </Text>
      <Text as="p" type={TEXT_TYPE.BODY_2}>
        <Anchor href={`mailto:${Emails.HELP}`} as={anchorTypes.A}>
          {Emails.HELP}
        </Anchor>
      </Text>
      <Text as="p" css={styles.contactContent} type={TEXT_TYPE.BODY_2}>
        {t('learnMore.contact.subtitle2')}
      </Text>
      <Text as="p" type={TEXT_TYPE.BODY_2}>
        <Anchor href={`mailto:${Emails.PRESS}`} as={anchorTypes.A}>
          {Emails.PRESS}
        </Anchor>
      </Text>
      <Text as="p" css={styles.contactContent} type={TEXT_TYPE.BODY_2}>
        {t('learnMore.contact.mediaResources')}
      </Text>
      <Text as="p" type={TEXT_TYPE.BODY_2}>
        <Anchor href={Links.PRESSKIT} as={anchorTypes.A} isExternalLink>
          {t('learnMore.contact.pressKit')}
        </Anchor>
      </Text>
    </div>
  );
};

export default Contact;
