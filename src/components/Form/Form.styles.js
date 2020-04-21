import { css } from '@emotion/core';
import { Color, Height, Space } from 'lib/theme';

const styles = {
  back: css({
    marginBottom: Space.S30,
  }),
  childWrapper: css({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }),
  description: css({
    color: Color.GRAY_75,
    '& strong': {
      color: Color.PRIMARY,
    },
  }),
  sections: css({
    '> *': {
      marginBottom: Space.S30,
    },
  }),
  title: css({
    marginBottom: Space.S15,

    a: {
      color: Color.PRIMARY,
      textDecoration: 'underline',
    },
  }),
  button: css({
    minHeight: Height.INPUT,
    position: 'relative',
  }),
  loader: css({
    left: '20px',
    position: 'absolute',
    top: `calc(50% - ${Height.LOADER / 2})`,
  }),
  root: css({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  }),
};

export default styles;
