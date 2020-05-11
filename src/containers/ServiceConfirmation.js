/** @jsx jsx */
import { jsx } from '@emotion/core';

import { ServiceConfirmation as ServiceConfirmationComponent } from 'components/Confirmation/ServiceConfirmation';

export const ServiceConfirmation = ({ service }) => {
  return <ServiceConfirmationComponent service={service} />;
};

export default ServiceConfirmation;
