/**
 * Convert string to new string with capitlized first letter
 */
export const capitalize = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
