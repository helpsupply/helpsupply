import { css } from 'lib/utils/media-queries';
import { Color, Space } from 'lib/theme';

const styles = {
  homePageContainer: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto 0',
  }),
  homePageContent: css({
    display: 'flex',
    margin: `0 ${Space.S150}px`,
  }),
  homePageContentBoth: css({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  }),
  homePageContentLeft: css({
    flexBasis: '50%',
    paddingRight: '14%',
  }),
  homePageContentRight: css({
    flexBasis: '50%',
    paddingLeft: '14%',
  }),
  homePageContentRow1: css({
    display: 'flex',
    flexBasis: Space.S150,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }),
  homePageContentRow2: css({
    flex: 1,
  }),
  homePageContentRow3: css({}),
  homePageContentRow4: css({
    display: 'flex',
    flexBasis: Space.S80,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }),
  homePageHowList: css({
    color: Color.WHITE,
    marginTop: Space.S35,
  }),
  homePageHowTitle: css({
    marginBottom: [0, 0, 0],
  }),
  homePageIntro: css({
    marginTop: [0, 0, Space.S35],
  }),
  root: css({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }),
};

export default styles;
