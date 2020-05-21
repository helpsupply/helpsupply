/** @jsx jsx */
import { jsx } from '@emotion/core';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

import { Color } from 'lib/theme';
import { Routes } from 'lib/constants/routes';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

const styles = {
  color: Color.GRAY_50,
  a: {
    color: Color.PRIMARY,
    textDecoration: 'none',
  },
};

const FormPrivacyNode = ({ ...rest }) => {
  const { t } = useTranslation();

  return (
    <Text as="div" type={TEXT_TYPE.NOTE} css={styles} {...rest}>
      <ReactMarkdown
        linkTarget={'_blank'}
        source={t('global.privacy.formNode', {
          url: Routes.PRIVACY,
        })}
      />
    </Text>
  );
};

export default FormPrivacyNode;
