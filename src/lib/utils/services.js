import RequestKinds from 'lib/organizations/kinds';
import { SERVICE_TEXT } from 'lib/constants/services';

export const buildServicesOptions = (services) => {
  const target = Object.entries(RequestKinds).map(([k, v], i) => {
    return { label: SERVICE_TEXT[i], value: v };
  });

  return target.filter((option) => {
    if (!services) {
      // hiding petcare option from dropdown until a petcare organization is found
      return option.value !== RequestKinds.PETCARE;
    }

    return services.includes(option.value);
  });
};
