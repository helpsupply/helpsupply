import { URGENCY_KEYS, URGENCY_TEXT } from 'lib/constants/urgency';

export const buildUrgencyOptions = () => {
  return Object.entries(URGENCY_KEYS).map(([k, v]) => {
    return { label: URGENCY_TEXT[k], value: v };
  });
};
