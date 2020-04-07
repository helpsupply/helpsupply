/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useLayoutEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';

export const VerticalWipe = ({
  appear = false,
  children,
  duration = 200,
  fade = false,
  open,
}) => {
  const [cOpacity, setCOpacity] = useState();
  const [isOpen, setIsOpen] = useState(open && !appear);

  useEffect(() => {
    if (fade && !open) {
      setCOpacity(0);
      return;
    }
    setCOpacity(1);
  }, [fade, open]);

  useLayoutEffect(() => {
    if (!open) {
      setIsOpen(false);
      return;
    }
    if (appear && open) {
      setIsOpen(true);
      return;
    }

    setIsOpen(true);
  }, [appear, open]);

  return (
    <div
      css={{
        opacity: cOpacity,
        transition: `opacity ${duration}ms`,
      }}
    >
      <AnimateHeight height={isOpen ? 'auto' : 0} duration={duration}>
        {children}
      </AnimateHeight>
    </div>
  );
};

export default VerticalWipe;
