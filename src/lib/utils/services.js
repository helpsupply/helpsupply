import RequestKinds from 'lib/organizations/kinds';
import { SERVICE_TEXT } from 'lib/constants/services';

export const buildServicesOptions = () => {
  return Object.entries(RequestKinds).map(([k, v], i) => {
    return { label: SERVICE_TEXT[i], value: v };
  });
};
