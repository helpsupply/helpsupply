/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import Text from 'components/Text'
import { TEXT_TYPE } from 'components/Text/constants'
import { ReactComponent as Check } from 'static/icons/check.svg'

import styles from './Checkbox.styles'

class InputCheckbox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: false,
    }
  }

  onChange = () => {
    if (this.props.customOnChange) {
      this.props.customOnChange(!this.state.checked)
    }
    this.setState({ checked: !this.state.checked })
  }

  render() {
    const { label, customOnChange, ...rest } = this.props

    return (
      <label css={styles.label}>
        <input
          checked={this.state.checked}
          css={styles.input}
          type="checkbox"
          onChange={this.onChange}
          {...rest}
        />
        <div
          css={[
            styles.iconContainer,
            this.state.checked && styles.iconContainerChecked,
          ]}>
          <Check
            css={[styles.icon, this.state.checked && styles.iconChecked]}
          />
        </div>
        <Text css={styles.text} type={TEXT_TYPE.BODY_2}>
          {label}
        </Text>
      </label>
    )
  }
}

export default InputCheckbox
