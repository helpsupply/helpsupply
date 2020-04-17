/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

import { Emails } from 'constants/Emails';

import { TEXT_TYPE } from 'components/Text/constants';
import Text from 'components/Text';
import Anchor, { anchorTypes } from 'components/Anchor';

import { styles } from './LearnMore.styles';

export const FAQ = () => {
  const { t } = useTranslation();
  const mutualAid = '[Mutual Aid NYC](https://mutualaid.nyc/)';
  const workersNeedChildcare =
    '[Workers Need Childcare](https://www.workersneedchildcare.org/)';
  const nycCovidCare =
    '[NYC COVID Care Network](https://www.nyccovidcare.org/)';
  return (
    <Fragment>
      <Text css={styles.faqSubtitle} as="h3" type={TEXT_TYPE.HEADER_5}>
        {t('learnMore.faq.question1')}
      </Text>
      <Text as="p" css={styles.answer} type={TEXT_TYPE.BODY_2}>
        {t('learnMore.faq.answer1')}
      </Text>
      <Text css={styles.faqSubtitle} as="h3" type={TEXT_TYPE.HEADER_5}>
        {t('learnMore.faq.question2')}
      </Text>
      <Text as="p" css={styles.answer} type={TEXT_TYPE.BODY_2}>
        {t('learnMore.faq.answer2')}
      </Text>
      <Text css={styles.faqSubtitle} as="h3" type={TEXT_TYPE.HEADER_5}>
        {t('learnMore.faq.question3')}
      </Text>
      <Text as="p" css={styles.answer} type={TEXT_TYPE.BODY_2}>
        <ReactMarkdown
          source={t('learnMore.faq.answer3', {
            mutualAid,
            workersNeedChildcare,
            nycCovidCare,
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
    </Fragment>
  );
};

export default FAQ;
