/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import Page from 'components/layouts/Page';
import Form from 'components/Form';
import { SupplyConfirmation } from 'components/Confirmation';
import SubCta from 'components/Confirmation/SubCta';
import SupplyForm from 'containers/SupplyForm';

function NewSupplyRequest({ backend, history }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { dropsite } = useParams();

  const handleSubmit = () => {
    console.log('handle supply submit for dropsite', dropsite);
    setLoading(false);
    setSent(true);
  };

  if (loading) {
    return null;
  }

  if (sent) {
    return (
      <Page currentProgress={1} totalProgress={5}>
        <Form
          buttonLabel={t('request.supplyConfirmation.submitLabel')}
          onSubmit={() => setSent(false)}
          subSection={
            <SubCta
              href={routeWithParams(Routes.DROPSITE_DETAIL, { id: dropsite })}
              message={t('request.supplyConfirmation.subSection.subCta')}
            />
          }
        >
          <SupplyConfirmation onEdit={() => setSent(false)} name="test" />
        </Form>
      </Page>
    );
  }

  return (
    <Page currentProgress={1} totalProgress={5}>
      <SupplyForm handleSubmit={handleSubmit} />
    </Page>
  );
}

export default withRouter(NewSupplyRequest);
