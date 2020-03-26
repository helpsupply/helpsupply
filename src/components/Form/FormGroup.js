/** @jsx jsx */
import { jsx } from "@emotion/core";

export const FormGroup = ({ children, mb }) => (
  <div css={{ marginBottom: mb }}>{children}</div>
);

export default FormGroup;
