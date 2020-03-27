import { formatDate } from './datetime';

describe('utils/datetime', () => {
  describe('formatDate()', () => {
    it('formats string date', () => {
      const exampleDate = '01/30/1981';
      const example = formatDate(exampleDate);

      expect(example).toBe('Jan 30, 12:00am');
    });

    it('formats string date with a time', () => {
      const exampleDate = '2013-02-08 09:30';
      const example = formatDate(exampleDate);

      expect(example).toBe('Feb 8, 9:30am');
    });

    it('formats RFC dates', () => {
      const rfcDate = 'Fri, 27 Mar 2020 07:28:30 +0000';
      const rfcExample = formatDate(rfcDate);
      expect(rfcExample).toBe('Mar 27, 12:28am');

      const rfc2822Date = 'Friday, 27-Mar-20 07:28:30 UTC';
      const rfc2822Example = formatDate(rfc2822Date);
      expect(rfc2822Example).toBe('Mar 27, 12:28am');

      const rfc3339Date = '2020-03-27T07:28:30+00:00';
      const rfc3339Example = formatDate(rfc3339Date);
      expect(rfc3339Example).toBe('Mar 27, 12:28am');
    });

    it('formats ISO 8601 date', () => {
      const exampleDate = '2020-03-27T07:28:30+00:00';
      const example = formatDate(exampleDate);

      expect(example).toBe('Mar 27, 12:28am');
    });
  });
});
