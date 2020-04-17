import { css } from '@emotion/core';
import { Color, Space } from 'lib/theme';

export const styles = {
  contact: css({
    color: Color.GRAY_75,
    marginTop: Space.S40,
  }),
  contactTitle: css({
    marginBottom: Space.S20,
    color: Color.GRAY,
  }),
  faqContent: css({
    marginBottom: 0,
  }),
  faqSubtitle: css({
    color: Color.GRAY,
  }),
  answer: css({
    marginBottom: Space.S40,

    a: {
      color: Color.PRIMARY,
    },
  }),
  organization: css({
    marginTop: Space.S40,
  }),
  partners: css({
    marginBottom: Space.S40,
  }),
};
