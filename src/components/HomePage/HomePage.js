/** @jsx jsx */
import { jsx } from '@emotion/core';

import LargeHeader from 'components/Header/LargeHeader';
import Intro, { OpenRequests } from 'components/EntryContent/Intro';
import { HowFaq, HowList, HowTitle } from 'components/EntryContent/HowItWorks';
import { CopyRight, ErrorMessage } from 'components/layouts/Page';

import styles from './HomePage.styles';

const HomePage = ({ rootContainerStyles }) => {
  return (
    <div css={[styles.root, rootContainerStyles]}>
      <ErrorMessage />

      <div css={styles.homePageContainer}>
        <div css={styles.homePageContent}>
          <div css={[styles.homePageContentBoth, styles.homePageContentLeft]}>
            <div css={styles.homePageContentRow1}>
              <LargeHeader isHome={true} hasBackButton={false} />
            </div>
            <div css={styles.homePageContentRow2}>
              <Intro headerMargin={styles.homePageIntro} openRequests={false} />
            </div>
            <div css={styles.homePageContentRow3}>
              <OpenRequests />
            </div>
            <div css={styles.homePageContentRow4}>
              <CopyRight />
            </div>
          </div>

          <div css={[styles.homePageContentBoth, styles.homePageContentRight]}>
            <div css={styles.homePageContentRow1}>
              <HowTitle css={styles.homePageHowTitle} />
            </div>
            <div css={styles.homePageContentRow2}>
              <HowList css={styles.homePageHowList} howFaq={false} />
            </div>
            <div css={styles.homePageContentRow3}>
              <HowFaq />
            </div>
            <div css={styles.homePageContentRow4} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
