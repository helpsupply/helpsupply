import { css } from '@emotion/core';
import { Color, Space } from 'lib/theme';

export const styles = {
  container: css({
    margin: `${Space.S40}px 0`,
  }),
  contact: css({
    color: Color.GRAY_75,
  }),
  contactTitle: css({
    marginBottom: Space.S30,
    color: Color.GRAY,
  }),
  faqContent: css({
    paddingBottom: Space.S20,
  }),
  contactContent: css({
    marginBottom: 0,
  }),
  faqSubtitle: css({
    color: Color.GRAY,
    marginBottom: Space.S20,
  }),
  answer: css({
    marginBottom: Space.S40,

    a: {
      color: Color.PRIMARY,
      textDecoration: 'none',
    },
  }),
  organization: css({
    marginTop: Space.S40,
  }),
  partners: css({
    marginBottom: Space.S40,
  }),
};
