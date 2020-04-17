import { css } from 'lib/utils/media-queries';

const styles = {
  root: css({
    left: ['50%', null, '75%'],
    position: 'fixed',
    top: '50%',
    transform: 'translate3d(-50%, -50%, 0)',
  }),
};

export default styles;
