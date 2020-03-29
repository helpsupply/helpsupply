/**
 * Validates email address, allows extension emails (+) and local parts with '.'
 * Does not allow trailing, leading, or consecutive '.'
 */
export const isValidEmail = (email) => {
  const re = /^(?!.*\.\.)\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return re.test(email);
};

export const required = {
  value: true,
  message: 'This field is required',
};
