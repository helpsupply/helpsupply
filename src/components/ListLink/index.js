/** @jsx jsx */
import { jsx } from '@emotion/core';

import Anchor from 'components/Anchor';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { ReactComponent as Arrow } from 'static/icons/arrow.svg';

import styles from './ListLink.styles';

const ListLink = ({ href, label }) => (
  <Anchor css={styles.root} href={href}>
    <div css={styles.content}>
      <Text type={TEXT_TYPE.HEADER_4} css={{ lineHeight: '32px' }}>
        {label}
      </Text>
      <Arrow />
    </div>
  </Anchor>
);

export default ListLink;
