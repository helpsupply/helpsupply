/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import styles from './InputText.styles'

class InputText extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isFocused: false,
      value: ''
    }
  }

  onChange = (e) => {
    this.setState({ value: e.target.value })
  }

  toggleFocus = () => {
    this.setState({ isFocused: !this.state.isFocused })
  }

  render() {
    const { isFocused, value } = this.state
    const { label, ...rest } = this.props

    return (
      <label css={[styles.root, isFocused && styles.active]}>
        {label && (
          <div css={[styles.label, (isFocused || value) && styles.activeLabel]}>{label}</div>
        )}
        <input css={styles.input} onBlur={this.toggleFocus} onFocus={this.toggleFocus} onChange={this.onChange} value={value} {...rest} />
      </label>
    );
  }
}

export default InputText
