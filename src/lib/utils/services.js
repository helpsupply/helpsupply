import RequestKinds from 'lib/organizations/kinds';
import { SERVICE_TEXT } from 'lib/constants/services';

export const buildServicesOptions = (services) => {
  const target = Object.entries(RequestKinds).map(([k, v], i) => {
    const org = services.filter((svc) => svc[0] === v)[0];
    return { label: SERVICE_TEXT[i], value: v, organization: org && org[1] };
  });

  return target.filter((option) => {
    if (!services) {
      // hiding petcare option from dropdown until a petcare organization is found
      return option.value !== RequestKinds.PETCARE;
    }

    return services.some((_) => _.includes(option.value));
  });
};
