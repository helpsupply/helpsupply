import { css } from 'lib/utils/media-queries';
import { AnimationStyles, Color, Radius, Space } from 'lib/theme';

export const modalAnimationStyles = {
  afterOpen: AnimationStyles.fadeIn,
  beforeClose: AnimationStyles.fadeOut,
};

const styles = {
  bodyScrollLock: css({
    overflow: 'hidden',
  }),
  modal: css({
    background: Color.WHITE,
    borderRadius: Radius.ROUNDED_WRAP,
    margin: 'auto',
    maxWidth: '500px',
    padding: Space.S30,
    textAlign: 'center',
  }),
  root: css({
    background: Color.BLACK_75,
    bottom: 0,
    display: 'flex',
    left: 0,
    padding: Space.S40,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 100,
  }),
  inner: css({}),
};

export default styles;
