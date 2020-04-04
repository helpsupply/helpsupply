import { css } from '@emotion/core';
import { Space } from 'lib/theme';

const styles = {
  button: css({
    width: 'calc(50% - 10px)',
  }),
  buttonContainer: css({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: Space.S40,
  }),
  loader: css({
    margin: 'auto',
  }),
};

export default styles;
