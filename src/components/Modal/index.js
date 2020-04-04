/** @jsx jsx */
import { ClassNames, jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import { AnimationTimes } from 'lib/theme';

import styles, { modalAnimationStyles } from './Modal.styles';

ReactModal.setAppElement('#root');

function Modal({
  children,
  contentLabel,
  handleClose,
  isOpen = false,
  onRequestClose,
}) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsClosing(!isOpen);
  }, [isOpen]);

  const { afterOpen, beforeClose } = modalAnimationStyles;

  return (
    <ClassNames>
      {({ css, cx }) => (
        <ReactModal
          className={css(styles.modal)}
          overlayClassName={cx([
            !isClosing && css(afterOpen),
            isClosing && css(beforeClose),
            css(styles.root),
          ])}
          bodyOpenClassName={css(styles.bodyScrollLock)}
          closeTimeoutMS={AnimationTimes.MS200}
          contentLabel={contentLabel}
          isOpen={isOpen}
          onRequestClose={onRequestClose}
        >
          <div className={styles.inner}>{children}</div>
        </ReactModal>
      )}
    </ClassNames>
  );
}

export default Modal;
