import { css } from 'lib/utils/media-queries';
import { Color, Space } from 'lib/theme';

const paddingDesktop = 22;
const additionalRightPadding = paddingDesktop * 0.2;
const rightPaddingDesktop = paddingDesktop + additionalRightPadding;

const styles = {
  desktopHomePage: css({
    marginTop: [0, 0, 0],
  }),
  error: css({
    alignSelf: ['', '', 'flex-end'],
    display: 'flex',
    flexDirection: 'column',
    width: ['', '', '50%'],
  }),
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
  headerContainerDesktopInnerPage: css({
    justifyContent: 'flex-start',
    paddingTop: Space.S110,
  }),
  headerContentDesktop: css({
    alignItems: 'flex-end',
    display: ['block', null, 'flex'],
    height: '100%',
    overflow: 'auto',
    position: 'relative',
    padding: `${Space.S40}px ${rightPaddingDesktop}% ${Space.S150}px ${Space.S150}px`,
  }),
  pageContent: css({
    display: 'flex',
    flexDirection: 'column',
    height: ['100%', '', 'auto'],
    padding: [
      `0 ${Space.S40}px ${Space.S40}px`,
      '',
      `0 ${paddingDesktop}% ${Space.S40}px `,
    ],
  }),
  noGutter: css({
    padding: [`0 0 ${Space.S40}px`, '', `0 0 ${Space.S40}px `],
  }),
  dashboardPageContent: css({
    display: 'flex',
    flexDirection: 'column',
    height: ['100%', '', 'auto'],
  }),
  pageContentContainer: css({
    alignSelf: ['', '', 'flex-end'],
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginTop: [Space.S30, null, Space.S145],
    width: ['', '', '50%'],
  }),
  root: css({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: [null, null, 'scroll'],
  }),
  copyright: css({
    color: Color.WHITE_75,
  }),
};

export default styles;
