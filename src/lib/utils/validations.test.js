import { isValidEmail, isValidPhoneNumber } from './validations';

describe('utils/validations', () => {
  describe('isValidEmail', () => {
    it('validates a basic email with @ and .', () => {
      expect(isValidEmail('hamburglar@rr.com')).toBe(true);
    });
    it('allows extension emails and emails with dot separators in local part', () => {
      expect(isValidEmail('party+parrot@rr.com')).toBe(true);
      expect(isValidEmail('party.parrot@rr.com')).toBe(true);
      expect(isValidEmail('super.party.parrot@rr.com')).toBe(true);
    });
    it('invalidates incomplete email', () => {
      expect(isValidEmail('hamburger')).toBe(false);
      expect(isValidEmail('hamburglar@rr')).toBe(false);
      expect(isValidEmail('rr.com')).toBe(false);
    });
    it('does not allow leading, trailing, or consecutive characters or extensions in local name', () => {
      expect(isValidEmail('.wrong@rr.com')).toBe(false);
      expect(isValidEmail('alsowrong.@rr.com')).toBe(false);
      expect(isValidEmail('+nope@rr.com')).toBe(false);
      expect(isValidEmail('nope+@rr.com')).toBe(false);
    });
  });
  describe('isValidPhoneNumber', () => {
    it('validates strings with 10 digits', () => {
      expect(isValidPhoneNumber('(111) 111-1111')).toBe(true);
      expect(isValidPhoneNumber('(111)-111-1111')).toBe(true);
    });
    it('invalidates strings with less or more than 10 digits', () => {
      expect(isValidPhoneNumber('1')).toBe(false);
      expect(isValidPhoneNumber('12345678901')).toBe(false);
    });
  });
});
