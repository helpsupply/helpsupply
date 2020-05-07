/** @jsx jsx */
import { jsx } from '@emotion/core';

import { Breakpoints } from 'lib/constants/breakpoints';
import { useMediaQuery } from 'hooks/useMediaQuery';

import HowItWorks from './HowItWorks';
import Intro from './Intro';

import styles from './EntryContent.styles';

const EntryContent = () => {
  const { matchesBreakpoint } = useMediaQuery();
  const isDesktop =
    (`(min-width: ${Breakpoints.LARGE}px)`,
    matchesBreakpoint(Breakpoints.LARGE));
  return (
    <div css={styles.root}>
      {!isDesktop && <Intro />}
      <HowItWorks />
    </div>
  );
};

export default EntryContent;
