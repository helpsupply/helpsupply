import { css } from 'lib/utils/media-queries';
import { Color, Space, Radius } from 'lib/theme';

export const styles = {
  description: css({
    color: Color.GRAY_75,
  }),
  link: css({
    color: Color.PRIMARY,
    textDecoration: 'none',
  }),
  organization: css({
    background: Color.GRAY_10,
    borderRadius: Radius.ROUNDED,
    padding: Space.S20,
    margin: `${Space.S20}px 0`,
  }),
  organizationName: css({
    marginTop: Space.S10,

    '&:first-letter': {
      textTransform: 'capitalize',
    },
  }),
  organizationSubtitle: css({
    color: Color.GRAY_50,
  }),
  primaryButton: css({
    marginTop: Space.S15,
  }),
  secondaryButton: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,

    span: {
      marginBottom: 'none',
    },
  }),
  shareLink: css({
    textAlign: 'center',
    padding: Space.S20,
  }),
};

export default styles;
