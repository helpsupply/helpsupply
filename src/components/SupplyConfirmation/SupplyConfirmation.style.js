import { css } from '@emotion/core';
import { textStyles } from 'components/Text/Text.styles';
import { Space } from 'lib/theme';

const styles = {
  check: css({
    marginLeft: Space.S10,
  }),
  subCta: css(textStyles.BOLD, {
    display: 'inline-block',
    marginBottom: Space.S25,
    textAlign: 'center',
    width: '100%',
  }),
  subSection: css({
    marginBottom: Space.S45,
  }),
  subText: css({
    alignItems: 'baseline',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  }),
};

export default styles;
