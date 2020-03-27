import { css } from '@emotion/core'

import { Color, Space } from 'lib/theme'

const bottomBorderSize = 2

const styles = {
  root: css({
    borderBottom: `${bottomBorderSize}px solid ${Color.GRAY_LIGHT}`,
    display: 'flex',
    padding: `${Space.S30}px ${Space.S40}px`,
    position: 'relative',

    ':after': {
      background: Color.CORAL,
      bottom: `-${bottomBorderSize}px`,
      content: '""',
      display: 'block',
      height: `${bottomBorderSize}px`,
      left: 0,
      position: 'absolute',
      width: '50%',
    },
  }),

  link: css({
    display: 'block',
  }),
}

export default styles
