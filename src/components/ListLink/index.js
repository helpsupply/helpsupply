/** @jsx jsx */
import { jsx } from '@emotion/core';
import styles from './ListLink.styles';
import Anchor from 'components/Anchor';
import Text from 'components/Text';
import { ReactComponent as Arrow } from 'static/icons/arrow.svg';
import { TEXT_TYPE } from 'components/Text/constants';

const ListLink = ({ href, text, title }) => (
  <Anchor css={styles.root} href={href}>
    <div css={styles.titleWithIcon}>
      <Text type={TEXT_TYPE.HEADER_3}>{title}</Text>
      <Arrow />
    </div>
    <Text css={styles.text} type={TEXT_TYPE.BODY_2}>
      {text}
    </Text>
  </Anchor>
);

export default ListLink;
