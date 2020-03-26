import { css } from '@emotion/core'
import { Color, Space } from 'lib/theme'

const styles = {
  root: css({
    borderBottom: `2px solid ${Color.GRAY_LIGHT}`,
    display: 'flex',
    marginBottom: '2em',
    padding: `${Space.S20}px ${Space.S40}px`,
    width: '100%',
  }),
  header: css({
    color: Color.CORAL,
    paddingLeft: Space.S10,
  }),
  plus: css({
    alignSelf: 'baseline',
  }),
}

export default styles
