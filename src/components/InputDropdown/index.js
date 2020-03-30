/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import Text from 'components/Text';
import { ReactComponent as Chevron } from 'static/icons/chevron.svg';

import styles from './InputDropdown.styles';

class InputDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.listEl = null;
    this.inputEl = null;
    this.state = {
      isOpen: false,
      value: '',
    };
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClick);
  }

  handleClick = (e) => {
    this.setState((prevState) => {
      // clicked outside list
      if (
        (prevState.isOpen && !this.listEl.contains(e.target)) ||
        e.target === this.inputEl
      ) {
        return { isOpen: !this.state.isOpen };
      }
    });
  };

  onChange = (option) => {
    if (this.props.customOnChange) {
      this.props.customOnChange(option.value);
    }
    this.setState({ value: option.label, isOpen: false });
  };

  render() {
    const { isOpen, value } = this.state;
    const { placeholder, options = [] } = this.props;

    return (
      <div css={[styles.root, isOpen && styles.active]}>
        <span css={[styles.placeholder, value && styles.selected]}>
          <Text>{value || placeholder}</Text>
        </span>
        <div
          value={value}
          ref={(ref) => (this.inputEl = ref)}
          css={styles.dropdown}
        >
          {isOpen && (
            <ul css={styles.list} ref={(ref) => (this.listEl = ref)}>
              {options.map((option) => (
                <li
                  onClick={() => this.onChange(option)}
                  css={styles.option}
                  key={option.label}
                  value={option.value}
                >
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

export default InputDropdown;
