import { css } from "@emotion/core";
import { Space } from "lib/theme";

const styles = {
  back: css({
    marginBottom: Space.S30,
  }),
  form: css({
    marginBottom: Space.S30,
  }),
  title: css({
    marginBottom: Space.S15,
  }),
  button: css({
    minHeight: 65,
  }),
  root: css({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    padding: `${Space.S30}px 0`,
  }),
};

export default styles;
