/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

import { Routes } from 'lib/constants/routes';
import { Emails } from 'lib/constants/emails';

import { TEXT_TYPE } from 'components/Text/constants';
import Text from 'components/Text';
import Anchor, { anchorTypes } from 'components/Anchor';

import { styles } from './LearnMore.styles';

export const FAQ = () => {
  const { t } = useTranslation();

  const mutualAid = `[${t(
    'learnMore.about.partners.partner1.title',
  )}](http://${t('learnMore.about.partners.partner1.url')})`;
  const workersNeedChildcare = `[${t(
    'learnMore.about.partners.partner2.title',
  )}](http://${t('learnMore.about.partners.partner2.url')})`;
  const nycCovidCare = `[${t(
    'learnMore.about.partners.partner3.title',
  )}](http://${t('learnMore.about.partners.partner1.url')})`;
  const invisibleHands = `[${t(
    'learnMore.about.partners.partner4.title',
  )}](http://${t('learnMore.about.partners.partner4.url')})`;

  return (
    <div css={styles.container}>
      <Text css={styles.faqSubtitle} as="h3" type={TEXT_TYPE.HEADER_5}>
        {t('learnMore.faq.question1')}
      </Text>
      <Text as="p" css={styles.answer} type={TEXT_TYPE.BODY_2}>
        {t('learnMore.faq.answer1')}
      </Text>
      <Text css={styles.faqSubtitle} as="h3" type={TEXT_TYPE.HEADER_5}>
        {t('learnMore.faq.question2')}
      </Text>
      <Text as="div" css={styles.answer} type={TEXT_TYPE.BODY_2}>
        <ReactMarkdown
          linkTarget={'_blank'}
          source={t('learnMore.faq.answer2', {
            url: Routes.PRIVACY,
          })}
        />
      </Text>
      <Text css={styles.faqSubtitle} as="h3" type={TEXT_TYPE.HEADER_5}>
        {t('learnMore.faq.question3')}
      </Text>
      <Text as="div" css={styles.answer} type={TEXT_TYPE.BODY_2}>
        <ReactMarkdown
          source={t('learnMore.faq.answer3', {
            mutualAid,
            workersNeedChildcare,
            nycCovidCare,
            invisibleHands,
          })}
        />
      </Text>
      <Text css={styles.faqSubtitle} as="h3" type={TEXT_TYPE.HEADER_5}>
        {t('learnMore.faq.question4')}
      </Text>
      <Text as="p" css={styles.answer} type={TEXT_TYPE.BODY_2}>
        {t('learnMore.faq.answer4')}
      </Text>
      <Text css={styles.faqSubtitle} as="h3" type={TEXT_TYPE.HEADER_5}>
        {t('learnMore.faq.question5')}
      </Text>
      <Text as="p" css={styles.answer} type={TEXT_TYPE.BODY_2}>
        {t('learnMore.faq.answer5')}{' '}
        <Anchor href={`mailto:${Emails.HELP}`} as={anchorTypes.A}>
          {Emails.HELP}
        </Anchor>
        .
      </Text>
    </div>
  );
};

export default FAQ;
