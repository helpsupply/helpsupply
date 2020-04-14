/** @jsx jsx */
import { jsx } from '@emotion/core';
import Toggle from '../Toggle';
import { styles } from './Head.styles';

export const Head = ({ children, position, onChange }) => {
  return (
    <div css={styles.root}>
      <Toggle
        css={{ flexGrow: 1, width: '100%' }}
        position={position}
        onChange={onChange}
      >
        {children}
      </Toggle>
    </div>
  );
};

export default Head;
