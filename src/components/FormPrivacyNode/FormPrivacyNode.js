/** @jsx jsx */
import { jsx } from '@emotion/core';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

import { Color } from 'lib/theme';
import { Routes } from 'constants/Routes';

import Anchor, { anchorTypes } from 'components/Anchor';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';

const FormPrivacyNode = ({ ...rest }) => {
  const { t } = useTranslation();

  return (
    <Text
      as="div"
      type={TEXT_TYPE.NOTE}
      css={{ color: Color.GRAY_50 }}
      {...rest}
    >
      <ReactMarkdown
        renderers={{
          root: ({ children }) => {
            return <div>{children[0].props.children}</div>;
          },
          link: ({ href, children }) => {
            return (
              <Anchor href={href} as={anchorTypes.A} forceBlank={true}>
                {children}
              </Anchor>
            );
          },
        }}
        source={t('global.privacy.formNode', {
          url: Routes.PRIVACY,
        })}
      />
    </Text>
  );
};

export default FormPrivacyNode;
