/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Lottie } from '@crello/react-lottie';

import * as animationData from 'lib/theme/help-supply_loader';

import styles from './PageLoader.styles';

const options = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
};

export const PageLoader = ({ passedStyles }) => {
  return (
    <div css={[styles.root, passedStyles]}>
      <Lottie config={options} />
    </div>
  );
};

export default PageLoader;
