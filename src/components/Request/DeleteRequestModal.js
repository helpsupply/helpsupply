/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import Modal from 'components/Modal';
import HeaderInfo from 'components/Form/HeaderInfo';
import { PrimaryButton } from 'components/Button';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import Loader from 'components/Loader';

import styles from './DeleteRequestModal.styles';

function DeleteRequestModal({
  deleteRequest,
  isLoading,
  isOpen,
  onRequestClose,
  request,
}) {
  const { t } = useTranslation();

  const { requestTitle } = request || {};

  return (
    <Modal
      contentLabel="Confirm delete request"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Fragment>
        <HeaderInfo
          title={`${t('dropsite.deleteRequest.modal.title')} ${
            requestTitle || ''
          }?`}
          description={t('dropsite.deleteRequest.modal.description')}
        />
        <div css={styles.buttonContainer}>
          <PrimaryButton onClick={onRequestClose} isOutline css={styles.button}>
            <Text type={TEXT_TYPE.BODY_1}>
              {t('dropsite.deleteRequest.modal.cancelBtn')}
            </Text>
          </PrimaryButton>
          <PrimaryButton
            onClick={deleteRequest}
            css={styles.button}
            disabled={isLoading}
          >
            {isLoading && (
              <Loader passedStyles={styles.loader} isPrimaryColor />
            )}
            {!isLoading && (
              <Text type={TEXT_TYPE.BODY_1}>
                {t('dropsite.deleteRequest.modal.deleteBtn')}
              </Text>
            )}
          </PrimaryButton>
        </div>
      </Fragment>
    </Modal>
  );
}

export default DeleteRequestModal;
