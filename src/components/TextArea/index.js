/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'

import styles from './TextArea.styles'

class TextArea extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isFocused: false,
      value: '',
    }
  }

  onChange = (e) => {
    if (this.props.customOnChange) {
      this.props.customOnChange(e.target.value)
    }
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
          <div css={[styles.label, value && styles.activeLabel]}>{label}</div>
        )}
        <textarea
          css={styles.textarea}
          onBlur={this.toggleFocus}
          onFocus={this.toggleFocus}
          onChange={this.onChange}
          value={value}
          {...rest}
        />
      </label>
    )
  }
}

export default TextArea
