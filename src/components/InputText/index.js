/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import styles from './InputText.styles'

class InputText extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { label, ...rest } = this.props
    return (
      <label css={styles.root}>
        {label && (
          <div css={styles.label}>{label}</div>
        )}
        <input css={styles.input} {...rest} />
      </label>
    );
  }
}

export default InputText
