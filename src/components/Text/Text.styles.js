import { css } from 'lib/utils/media-queries';
import { TEXT_TYPE } from './constants';

export const Font = `"Inter", Helvetica, Arial, sans-serif`;

export const textStyles = {
  [TEXT_TYPE.HEADER_1]: css({
    fontFamily: Font,
    fontSize: 40,
    lineHeight: '34px',
    letterSpacing: '-0.04em',
  }),
  [TEXT_TYPE.HEADER_2]: css({
    fontFamily: Font,
    fontSize: 30,
    fontWeight: 600,
    lineHeight: '34px',
  }),
  [TEXT_TYPE.HEADER_3]: css({
    fontFamily: Font,
    fontSize: 26,
    fontWeight: 600,
    lineHeight: '32px',
    letterSpacing: '-0.04em',
  }),
  [TEXT_TYPE.HEADER_4]: css({
    fontFamily: Font,
    fontSize: 20,
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: '-0.02em',
  }),
  [TEXT_TYPE.HEADER_5]: css({
    fontFamily: Font,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '26px',
    letterSpacing: '-0.01em',
  }),
  [TEXT_TYPE.HEADER_6]: css({
    fontFamily: Font,
    fontSize: 15,
    fontWeight: 600,
    lineHeight: '12px',
    letterSpacing: '-0.01em',
  }),
  [TEXT_TYPE.CONTENT_HEADER]: css({
    fontFamily: Font,
    fontSize: [26, null, 32],
    fontWeight: 600,
    lineHeight: ['32px', null, '36px'],
    letterSpacing: ['-0.02em', null, '-0.04em'],
  }),
  [TEXT_TYPE.BODY_1]: css({
    fontFamily: Font,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: '-0.03em',
  }),
  [TEXT_TYPE.BODY_2]: css({
    fontFamily: Font,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '22px',
    letterSpacing: '-0.01em',
  }),
  [TEXT_TYPE.BODY_3]: css({
    fontFamily: Font,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: '-0.02em',
  }),
  [TEXT_TYPE.NOTE]: css({
    fontFamily: Font,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '18px',
    letterSpacing: '-0.01em',
  }),
  [TEXT_TYPE.BOLD]: css({
    fontWeight: 600,
  }),
};

export default textStyles;
