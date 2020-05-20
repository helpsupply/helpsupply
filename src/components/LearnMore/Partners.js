/** @jsx jsx */
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import Anchor, { anchorTypes } from 'components/Anchor';

import { styles } from './LearnMore.styles';

export const Partners = () => {
  const { t } = useTranslation();
  return (
    <div css={styles.partners}>
      <div css={styles.organization}>
        <Text as="h4" css={styles.faqSubtitle} type={TEXT_TYPE.HEADER_6}>
          {t('learnMore.about.partners.partner1.title')}
        </Text>
        <Text as="p" type={TEXT_TYPE.BODY_2}>
          <Anchor
            href={`http://${t('learnMore.about.partners.partner1.url')}`}
            as={anchorTypes.A}
            isExternalLink
          >
            {t('learnMore.about.partners.partner1.url')}
          </Anchor>
        </Text>
      </div>
      <div css={styles.organization}>
        <Text as="h4" css={styles.faqSubtitle} type={TEXT_TYPE.HEADER_6}>
          {t('learnMore.about.partners.partner2.title')}
        </Text>
        <Text as="p" type={TEXT_TYPE.BODY_2}>
          <Anchor
            href={`http://${t('learnMore.about.partners.partner2.url')}`}
            as={anchorTypes.A}
            isExternalLink
          >
            {t('learnMore.about.partners.partner2.url')}
          </Anchor>
        </Text>
      </div>
      <div css={styles.organization}>
        <Text as="h4" css={styles.faqSubtitle} type={TEXT_TYPE.HEADER_6}>
          {t('learnMore.about.partners.partner3.title')}
        </Text>
        <Text as="p" type={TEXT_TYPE.BODY_2}>
          <Anchor
            href={`http://${t('learnMore.about.partners.partner3.url')}`}
            as={anchorTypes.A}
            isExternalLink
          >
            {t('learnMore.about.partners.partner3.url')}
          </Anchor>
        </Text>
      </div>
      <div css={styles.organization}>
        <Text as="h4" css={styles.faqSubtitle} type={TEXT_TYPE.HEADER_6}>
          {t('learnMore.about.partners.partner4.title')}
        </Text>
        <Text as="p" type={TEXT_TYPE.BODY_2}>
          <Anchor
            href={`http://${t('learnMore.about.partners.partner4.url')}`}
            as={anchorTypes.A}
            isExternalLink
          >
            {t('learnMore.about.partners.partner4.url')}
          </Anchor>
        </Text>
      </div>
    </div>
  );
};

export default Partners;
