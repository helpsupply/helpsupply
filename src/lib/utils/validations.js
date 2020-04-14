/**
 * Validates email address, allows extension emails (+) and local parts with '.'
 * Does not allow trailing, leading, or consecutive '.'
 */
export const isValidEmail = (email) => {
  const re = /^(?!.*\.\.)\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return re.test(email);
};

/**
 * Validates phone number by stripping all non-numeric characters
 */
export const isValidPhoneNumber = (value) => {
  if (!value) {
    return false;
  }
  const numericString = value.replace(/[^0-9]+/g, '');
  const strippedValue = numericString;
  const re = /^\d{10}$/;
  return re.test(strippedValue);
};

/**
 * Checks for valid 5 digit or 5-4 digit zip codes
 */
export const isValidZipCode = (zipCode) => {
  const re = /^[0-9]{5}(?:-[0-9]{4})?$/;
  return re.test(zipCode);
};

/**
 * Validates if value exists and is not empty
 */
export const isNotEmpty = (value) => !!value;

export const required = {
  value: true,
  message: 'This field is required',
};
