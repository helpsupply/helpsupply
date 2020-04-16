import { css } from 'lib/utils/media-queries';
import { Color, Space } from 'lib/theme';

const paddingDesktop = 22;
const additionalRightPadding = paddingDesktop * 0.2;
const rightPaddingDesktop = paddingDesktop + additionalRightPadding;

const styles = {
  headerContainerDesktop: css({
    backgroundColor: Color.PRIMARY,
    bottom: 0,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: '50%',
    top: 0,
  }),
  headerContentDesktop: css({
    overflow: 'auto',
    padding: `${Space.S40}px ${rightPaddingDesktop}% ${Space.S40}px ${paddingDesktop}%`,
  }),
  pageContent: css({
    display: 'flex',
    flexDirection: 'column',
    height: ['100%', '', 'auto'],
    padding: [
      `0 ${Space.S40}px ${Space.S40}px`,
      '',
      `${Space.S40}px ${paddingDesktop}% ${Space.S40}px `,
    ],
  }),
  pageContentContainer: css({
    alignSelf: ['', '', 'flex-end'],
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: ['', '', '50%'],
  }),
  root: css({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }),
  copyright: css({
    color: Color.WHITE_25,
  }),
};

export default styles;
