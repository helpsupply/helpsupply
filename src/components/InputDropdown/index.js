/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import Text from 'components/Text/Text'
import { ReactComponent as Chevron } from 'static/icons/chevron.svg'

import styles from './InputDropdown.styles'

class InputDropdown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      value: ''
    }
  }

  onChange = (option) => {
    this.setState({ value: option.label })
  }

  toggleOpen = () => {
    this.setState({ isFocused: !this.state.isFocused, isOpen: !this.state.isOpen })
  }

  render() {
    const { isOpen, value } = this.state
    const { placeholder, options = [] } = this.props

    return (
      <div css={[styles.root, isOpen && styles.active]}>
        <span css={[styles.placeholder, value && styles.selected]}>
          <Text>{value || placeholder}</Text>
        </span>
        <div
          value={value}
          onClick={this.toggleOpen}
          onBlur={this.toggleOpen}
          css={styles.dropdown}>
          {isOpen && (
            <ul css={styles.list}>
              {options.map(option => (
                <li
                  onClick={() => this.onChange(option)}
                  css={styles.option}
                  key={option.label}
                  value={option.value}>
                  <Text>{option.label}</Text>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Chevron css={[styles.chevron, isOpen && styles.chevronOpen]} />
      </div>
    );
  }
}

export default InputDropdown
