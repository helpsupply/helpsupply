/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Routes } from 'constants/Routes';
import { mentalHealthOptions } from 'lib/constants/options';
import { routeWithParams } from 'lib/utils/routes';
import RequestKinds from 'lib/organizations/kinds';
import { mapServiceKindToTitle } from 'lib/theme/services';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { PrimaryButton } from 'components/Button';
import GroceryServiceReview from 'components/ServiceReview/Grocery';
import ChildcareServiceReview from 'components/ServiceReview/Childcare';
import PetcareServiceReview from 'components/ServiceReview/Petcare';
import MentalHealthServiceReview from 'components/ServiceReview/MentalHealth';

import { styles } from 'components/ServiceReview/ServiceReview.styles';

function ServiceReview({ backend, id, service, serviceUser, user }) {
  const history = useHistory();
  const { t } = useTranslation();
  const [details, setDetails] = useState();

  const handleSubmit = async () => {
    await backend
      .updateServiceRequest(id, { status: 'open' }, true)
      .then(() =>
        backend.sendRequestConfirmation({
          id,
          organization: backend.getMetadataForProvider(service.organization)
            .Organization,
          type: mapServiceKindToTitle()[service.kind],
          date: service.date,
          details,
        }),
      )
      .then(() => {
        history.push(
          routeWithParams(Routes.SERVICE_CONFIRMATION, {
            id,
          }),
        );
      })
      .catch((error) => {
        console.error('error', error);
      });
    // service TODO: handle exceptions
  };

  useEffect(() => {
    if (!service || !serviceUser || !user) {
      return;
    }

    let contact = {
      Contact: `${serviceUser.firstName} ${serviceUser.lastName}`,
      'Contact Preference': serviceUser.contactPreference,
      [`${serviceUser.contactPreference === 'phone' ? 'Phone' : 'Email'}`]: `${
        serviceUser.contactPreference === 'phone'
          ? serviceUser.phone
          : user.email
      }`,
    };

    if (
      service.additionalContactContactPreference &&
      service.additionalContactFirstName &&
      service.additionalContactLastName
    ) {
      contact = {
        Contact: `${service.additionalContactFirstName} ${service.additionalContactLastName}`,
        'Contact Preference': service.additionalContactContactPreference,
        [`${
          service.additionalContactContactPreference === 'phone'
            ? 'Phone'
            : 'Email'
        }`]: `${
          service.additionalContactContactPreference === 'phone'
            ? service.additionalContactPhone
            : service.additionalContactEmail
        }`,
      };
    }

    setDetails({
      ...contact,
      ...(service.date && { Date: `${service.date}, ${service.time}` }),

      // groceries
      ...(service.groceryList && { 'Grocery List': service.groceryList }),
      ...(service.dietaryRestrictions && {
        'Dietary Restrictions': service.dietaryRestrictions,
      }),

      // mental health
      ...(service.kind === RequestKinds.MENTALHEALTH &&
        service.type && {
          'Help Type': mentalHealthOptions.find((o) => o.value === service.type)
            ?.label,
        }),

      // childcare
      ...(service.children && {
        Children: Object.keys(service.children).length,
      }),

      ...(service.additionalInfo && {
        'Additional Information': service.additionalInfo,
      }),
    });
  }, [service, serviceUser, user]);

  return (
    <Fragment>
      <Text as="h2" type={TEXT_TYPE.HEADER_3} css={styles.title}>
        {t('request.review.title')}
      </Text>
      {service.kind === RequestKinds.GROCERY && (
        <GroceryServiceReview
          id={id}
          service={service}
          serviceUser={serviceUser}
          handleSubmit={handleSubmit}
        />
      )}
      {service.kind === RequestKinds.CHILDCARE && (
        <ChildcareServiceReview
          id={id}
          service={service}
          serviceUser={serviceUser}
          handleSubmit={handleSubmit}
        />
      )}
      {service.kind === RequestKinds.PETCARE && (
        <PetcareServiceReview
          id={id}
          service={service}
          serviceUser={serviceUser}
          handleSubmit={handleSubmit}
        />
      )}
      {service.kind === RequestKinds.MENTALHEALTH && (
        <MentalHealthServiceReview
          id={id}
          service={service}
          serviceUser={serviceUser}
          handleSubmit={handleSubmit}
        />
      )}
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
