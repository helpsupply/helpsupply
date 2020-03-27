import { css } from '@emotion/core'
import { Space } from 'lib/theme'

const styles = {
  back: css({
    marginBottom: Space.S30,
  }),
  sections: css({
    '> *': {
      marginBottom: Space.S30,
    },
  }),
  title: css({
    marginBottom: Space.S15,
  }),
  button: css({
    minHeight: 65,
  }),
  root: css({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: Space.S40,
  }),
}

export default styles
