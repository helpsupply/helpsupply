import { css as emotionCSS } from '@emotion/core';
import facepaint from 'facepaint';

import { BreakpointsAll } from 'constants/breakpoints';

const mediaQueries = BreakpointsAll.map((bp) => `@media(min-width: ${bp}px)`);
const mq = facepaint(mediaQueries);

export const css = (...rules) => emotionCSS(mq(rules));
