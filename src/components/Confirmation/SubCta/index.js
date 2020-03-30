/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import Anchor from 'components/Anchor';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { styles } from './SubCta.styles';

const SubCta = ({ message, href }) => {
  return (
    <Anchor href={href}>
      <Text css={styles.subCta} type={TEXT_TYPE.BODY_2}>
        {message}
      </Text>
    </Anchor>
  );
};

SubCta.propTypes = {
  message: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default SubCta;
