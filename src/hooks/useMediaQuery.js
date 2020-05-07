import { useCallback, useEffect, useRef, useState } from 'react';

import { BreakpointsAll } from 'lib/constants/breakpoints';

export function useMediaQuery() {
  const mediaQueryLists = useRef(
    BreakpointsAll.map((minWidth) =>
      window.matchMedia(`(min-width: ${minWidth}px)`),
    ),
  );
  const [matches, setMatches] = useState(
    mediaQueryLists.current.map((mediaQueryList) => mediaQueryList.matches),
  );

  const handleMatchUpdate = useCallback(() => {
    setMatches(
      mediaQueryLists.current.map((mediaQueryList) => mediaQueryList.matches),
    );
  }, []);

  useEffect(() => {
    const cachedMediaQueryLists = mediaQueryLists.current;
    cachedMediaQueryLists.forEach((mediaQueryList) => {
      mediaQueryList.addListener(handleMatchUpdate);
    });
    return () => {
      cachedMediaQueryLists.forEach((mediaQueryList) => {
        mediaQueryList.removeListener(handleMatchUpdate);
      });
    };
  }, [handleMatchUpdate]);

  const matchesBreakpoint = useCallback(
    (breakpoint) => {
      const breakpointIndex = BreakpointsAll.indexOf(breakpoint);
      return matches[breakpointIndex] ?? false;
    },
    [matches],
  );

  return { matchesBreakpoint };
}
