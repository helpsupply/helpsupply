/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { Emails } from 'constants/Emails';
import { TEXT_TYPE } from 'components/Text/constants';
import Text from 'components/Text';
import Anchor, { anchorTypes } from 'components/Anchor';

export const FAQ = () => {
  const { t } = useTranslation();
  return (
    <ul>
      <li>
        <Text as="p" type={TEXT_TYPE.BODY_2}>
          {t('learnMore.faq.bullet1')}
        </Text>
      </li>
      <li>
        <Text as="p" type={TEXT_TYPE.BODY_2}>
          {t('learnMore.faq.bullet2')}
        </Text>
      </li>
      <li>
        <Text as="p" type={TEXT_TYPE.BODY_2}>
          {t('learnMore.faq.bullet3')}
        </Text>
      </li>
      <li>
        <Text as="p" type={TEXT_TYPE.BODY_2}>
          {t('learnMore.faq.bullet4')}
        </Text>
      </li>
      <li>
        <Text as="p" type={TEXT_TYPE.BODY_2}>
          {t('learnMore.faq.bullet5')}{' '}
          <Anchor href={`mailto:${Emails.HELP}`} as={anchorTypes.A}>
            {Emails.HELP}
          </Anchor>
          .
        </Text>
      </li>
    </ul>
  );
};

export default FAQ;
