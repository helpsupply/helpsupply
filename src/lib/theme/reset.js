export const buttonReset = {
  alignItems: 'unset',
  background: 'transparent',
  border: 'none',
  padding: 0,
  '&:not([disabled])': { cursor: 'pointer' },
};

export const selectReset = {
  appearance: 'none',
  outline: 0,
  boxShadow: 'none',
  border: '0',
  backgroundColor: 'transparent',
  backgroundImage: 'none',
  cursor: 'pointer',

  /* Remove IE arrow */
  '&::-ms-expand': {
    display: 'none',
  },
};
