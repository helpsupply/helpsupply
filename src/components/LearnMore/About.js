/** @jsx jsx */
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { Emails } from 'constants/Emails';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import Anchor, { anchorTypes } from 'components/Anchor';

export const About = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Text as="h3" type={TEXT_TYPE.HEADER_5}>
        {t('learnMore.about.title')}
      </Text>
      <Text as="p" type={TEXT_TYPE.BODY_2}>
        {t('learnMore.about.paragraph1')}
      </Text>
      <Text as="p" type={TEXT_TYPE.BODY_2}>
        {t('learnMore.about.paragraph2')}
      </Text>
      <Text as="h3" type={TEXT_TYPE.HEADER_5}>
        {t('learnMore.about.who.title')}
      </Text>
      <Text as="p" type={TEXT_TYPE.BODY_2}>
        {t('learnMore.about.who.paragraph1')}
      </Text>
      <Text as="p" type={TEXT_TYPE.BODY_2}>
        {t('learnMore.about.who.paragraph2')}
      </Text>
      <Text as="h3" type={TEXT_TYPE.HEADER_5}>
        {t('learnMore.about.partners.title')}
      </Text>
      <Text as="p" type={TEXT_TYPE.BODY_2}>
        {t('learnMore.about.partners.paragraph1')}
      </Text>
      <Text as="p" type={TEXT_TYPE.BODY_2}>
        {t('learnMore.about.partners.paragraph2')}
      </Text>
      <Text as="p" type={TEXT_TYPE.BODY_2}>
        {t('learnMore.about.partners.paragraph3')}{' '}
        <Anchor href={`mailto:${Emails.HELP}`} as={anchorTypes.A}>
          {Emails.HELP}
        </Anchor>
        .
      </Text>
    </Fragment>
  );
};

export default About;
