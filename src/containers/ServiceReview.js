/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Routes } from 'constants/Routes';
import { routeWithParams } from 'lib/utils/routes';
import RequestKinds from 'lib/organizations/kinds';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { PrimaryButton } from 'components/Button';
import GroceryServiceReview from 'components/ServiceReview/Grocery';
import ChildcareServiceReview from 'components/ServiceReview/Childcare';
import PetcareServiceReview from 'components/ServiceReview/Petcare';
import MentalHealthServiceReview from 'components/ServiceReview/MentalHealth';

import { styles } from 'components/ServiceReview/ServiceReview.styles';

import { styles } from 'components/ServiceReview/ServiceReview.styles';

function ServiceReview({ id, service }) {
  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = () => {
    history.push(
      routeWithParams(Routes.SERVICE_CONFIRMATION, {
        id,
      }),
    );
  };

  return (
    <Fragment>
      <Text as="h2" type={TEXT_TYPE.HEADER_3} css={styles.title}>
        {t('request.review.title')}
      </Text>
      {service.kind === RequestKinds.GROCERY && (
        <GroceryServiceReview
          id={id}
          service={service}
          handleSubmit={handleSubmit}
        />
      )}
<<<<<<< HEAD
      {service.kind === RequestKinds.CHILDCARE && (
        <ChildcareServiceReview
          id={id}
          service={service}
          handleSubmit={handleSubmit}
        />
      )}
      {service.kind === RequestKinds.PETCARE && (
        <PetcareServiceReview
          id={id}
          service={service}
          handleSubmit={handleSubmit}
        />
      )}
      {service.kind === RequestKinds.MENTALHEALTH && (
        <MentalHealthServiceReview
          id={id}
          service={service}
          handleSubmit={handleSubmit}
        />
      )}
=======
>>>>>>> feat: finish grocery service review
      <Text css={styles.disclaimer} type={TEXT_TYPE.NOTE}>
        {t('request.review.disclaimer')}
      </Text>
      <PrimaryButton type="submit" onClick={handleSubmit}>
        <Text>{t('request.review.submit')}</Text>
      </PrimaryButton>
    </Fragment>
  );
}

export default ServiceReview;
