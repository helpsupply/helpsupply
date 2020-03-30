import { css } from 'lib/utils/media-queries';
import { Color, Space } from 'lib/theme';

const paddingDesktop = 22;
const additionalRightPadding = paddingDesktop * 0.2;
const rightPaddingDesktop = paddingDesktop + additionalRightPadding;

const containerDesktop = {
  bottom: 0,
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  position: 'fixed',
  top: 0,
};

const styles = {
  content: css({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: [`0 ${Space.S40}px ${Space.S40}px`, '', `0 ${paddingDesktop}%`],
  }),
  headerContentDesktop: css({
    padding: `0 ${rightPaddingDesktop}% 0 ${paddingDesktop}%`,
  }),
  leftContainerDesktop: css({
    ...containerDesktop,
    backgroundColor: Color.CORAL,
    justifyContent: 'center',
    left: 0,
    right: '50%',
  }),
  rightContainerDesktop: css({
    ...containerDesktop,
    left: '50%',
    right: 0,
  }),
};

export default styles;
