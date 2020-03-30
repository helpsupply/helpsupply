/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import Anchor from 'components/Anchor';
import { SecondaryButton } from 'components/Button';
import Note from 'components/Note';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import styles from './SupplyConfirmation.style';
import { ReactComponent as Check } from 'static/icons/green-check.svg';
import FormBuilder from 'components/Form/FormBuilder';

function SupplyConfirmation() {
  const { t } = useTranslation();

  return (
    <FormBuilder
      subSection={
        <Anchor href="/">
          <Text css={styles.subCta} type={TEXT_TYPE.BODY_2}>
            {t('request.supplyConfirmation.subSection.subCta')}
          </Text>
        </Anchor>
      }
      buttonLabel={t('request.supplyConfirmation.submitLabel')}
      onSubmit={() => null}
      title={
        <Fragment>
          {t('request.supplyConfirmation.header')}
          <Check css={styles.check} />
        </Fragment>
      }
    >
      <Fragment>
        <div css={styles.subText}>
          <Note>{t('request.supplyConfirmation.subText.note')} #1454</Note>

          <SecondaryButton onClick={() => null}>
            <Text type={TEXT_TYPE.NOTE}>
              {t('request.supplyConfirmation.subText.cta')}
            </Text>
          </SecondaryButton>
        </div>

        <Text as="p" type={TEXT_TYPE.BODY_1}>
          N95 Masks: 1,750
        </Text>

        <Text as="p" type={TEXT_TYPE.BODY_2}>
          {t('request.supplyConfirmation.message')}
        </Text>
      </Fragment>
    </FormBuilder>
  );
}

export default SupplyConfirmation;
