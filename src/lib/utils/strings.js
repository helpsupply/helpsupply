/**
 * Convert string to new string with capitlized first letter
 */
export const capitalize = (str) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;

export const formatPhoneNumber = (phone) => {
  const numericString = phone.replace(/[^0-9]+/g, '');
  return numericString.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};
