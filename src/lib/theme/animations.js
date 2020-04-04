import { keyframes } from '@emotion/core';
import { css } from 'lib/utils/media-queries';

export const AnimationTimes = {
  MS200: 200,
};

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

const fadeOut = keyframes({
  '0%': {
    opacity: 1,
  },

  '100%': {
    opacity: 0,
  },
});

export const AnimationStyles = {
  fadeIn: css({
    animation: `${fadeIn} ${AnimationTimes.MS200}ms both`,
  }),
  fadeOut: css({
    animation: `${fadeOut} ${AnimationTimes.MS200}ms both`,
  }),
};
