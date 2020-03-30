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

export const required = {
  value: true,
  message: 'This field is required',
};
