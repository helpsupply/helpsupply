import RequestKinds from 'lib/organizations/kinds';
import { SERVICE_TEXT } from 'lib/constants/services';

export const buildServicesOptions = () => {
  const target = Object.entries(RequestKinds).map(([k, v], i) => {
    return { label: SERVICE_TEXT[i], value: v };
  });

  // hiding petcare option from dropdown until a petcare organization is found
  return target.filter((option) => option.value !== RequestKinds.PETCARE);
};
