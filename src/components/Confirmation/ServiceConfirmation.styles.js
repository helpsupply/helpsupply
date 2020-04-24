import { css } from 'lib/utils/media-queries';
import { Color, Space, Radius } from 'lib/theme';

export const styles = {
  description: css({
    color: Color.GRAY_75,
    marginBottom: Space.S30,
  }),
  link: css({
    color: Color.PRIMARY,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    padding: 0,
  }),
  organization: css({
    background: Color.GRAY_10,
    borderRadius: Radius.ROUNDED,
    padding: Space.S25,
    marginBottom: Space.S40,
  }),
  organizationName: css({
    marginTop: Space.S10,

    '&:first-letter': {
      textTransform: 'capitalize',
    },
  }),
  organizationSubtitle: css({
    color: Color.GRAY_50,
    marginBottom: Space.S15,
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
    marginBottom: Space.S30,
  }),
};

export default styles;
