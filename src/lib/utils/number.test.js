import { numberWithCommas } from './number'

describe('utils/number', () => {
  describe('numberWithCommas()', () => {
    it('formats four digit number', () => {
      const example = numberWithCommas(1000)
      expect(example).toBe('1,000')
    })
    it('formats sevent digit number', () => {
      const example = numberWithCommas(1000000)
      expect(example).toBe('1,000,000')
    })
    it('formats four digit number with decimal', () => {
      const example = numberWithCommas(1000.12)
      expect(example).toBe('1,000.12')
    })
    it('does not format three digit number', () => {
      const example = numberWithCommas(100)
      expect(example).toBe('100')
    })
    it('does not format one digit number', () => {
      const example = numberWithCommas(1)
      expect(example).toBe('1')
    })
  })
})
