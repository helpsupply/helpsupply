/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useContext } from 'react';
import { AccordionContext } from '../Accordion';
import { ReactComponent as Plus } from 'static/icons/plus.svg';
import { ReactComponent as Minus } from 'static/icons/minus.svg';
import { styles } from './Toggle.styles';

const updateSelected = ({
  onChange,
  position,
  selected,
  setSelected,
}) => () => {
  const pos = position === selected ? null : position;

  setSelected(pos);
  if (onChange) {
    onChange(pos);
  }
};

export const Toggle = ({ children, onChange, position }) => {
  const { selected, setSelected } = useContext(AccordionContext);

  return (
    <button
      css={styles.root}
      onClick={updateSelected({
        onChange,
        position,
        selected,
        setSelected,
      })}
    >
      {children}
      <div css={styles.indicator}>
        {selected === position ? <Minus /> : <Plus />}
      </div>
    </button>
  );
};

export default Toggle;
