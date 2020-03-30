import { css } from '@emotion/core';
import { textStyles } from 'components/Text/Text.styles';
import { Space } from 'lib/theme';

export const styles = {
  subCta: css(textStyles.BOLD, {
    display: 'inline-block',
    marginBottom: Space.S25,
    textAlign: 'center',
    width: '100%',
  }),
};
