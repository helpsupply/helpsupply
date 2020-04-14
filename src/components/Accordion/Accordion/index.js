/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createContext, useEffect, useRef, useState } from 'react';
import VerticalWipe from 'components/VerticalWipe';
import { styles } from './Accordion.styles';

export const AccordionContext = createContext({
  selected: 0,
  setSelected: () => null,
});

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const Accordion = ({ data, defaultSelected = null }) => {
  const [selected, setSelected] = useState(defaultSelected ?? null);
  const prevDefault = usePrevious(defaultSelected);

  useEffect(() => {
    if (prevDefault !== defaultSelected) {
      setSelected(defaultSelected ?? null);
    }
  }, [defaultSelected, prevDefault, setSelected]);

  return (
    <AccordionContext.Provider value={{ selected, setSelected }}>
      <ul css={styles.root}>
        {data.map(({ content, head }, index) => {
          const open = index === selected;
          return (
            <li css={styles.container} key={index}>
              <div css={styles.head}>{head}</div>
              {content && (
                <VerticalWipe fade open={open}>
                  <div css={styles.content}>{content}</div>
                </VerticalWipe>
              )}
            </li>
          );
        })}
      </ul>
    </AccordionContext.Provider>
  );
};

export default Accordion;
