import { css } from 'lib/utils/media-queries';
import { Color, Space, Radius } from 'lib/theme';

export const styles = {
  description: css({
    color: Color.GRAY,
  }),
  organization: css({
    background: Color.GRAY_10,
    borderRadius: Radius.ROUNDED,
    padding: Space.S10,
  }),
  organizationName: css({
    marginTop: Space.S10,

    '&:first-letter': {
      textTransform: 'capitalize',
    },
  }),
  button: css({
    marginTop: ['auto', '', Space.S5],
  }),
  subCta: css({
    marginTop: Space.S20,
  }),
};

export default styles;
