/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import Text from "components/Text";
import { TEXT_TYPE } from "components/Text/constants";
import { PrimaryButton } from "components/Button";

import styles from "./Form.styles.js";

class Form extends React.Component {
  static propTypes = {
    buttonLabel: PropTypes.string,
    description: PropTypes.string,
    disabled: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      buttonLabel = "Next",
      description,
      disabled,
      onSubmit,
      title,
    } = this.props;
    return (
      <form onSubmit={onSubmit} css={styles.root}>
        <div css={styles.form}>
          {title && (
            <Text as="h3" type={TEXT_TYPE.HEADER_3} css={styles.title}>
              {title}
            </Text>
          )}
          {description && (
            <Text as="p" type={TEXT_TYPE.BODY_2}>
              {description}
            </Text>
          )}
          {this.props.children}
        </div>
        <PrimaryButton type="submit" disabled={disabled} css={styles.button}>
          <Text type={TEXT_TYPE.BODY_1}>{buttonLabel}</Text>
        </PrimaryButton>
      </form>
    );
  }
}

export default Form;
