export const Font = `"Inter", Helvetica, Arial, sans-serif`

export const TEXT_TYPE = {
  'HEADER_1': 'HEADER_1',
  'HEADER_2': 'HEADER_2',
  'HEADER_3': 'HEADER_3',
  'HEADER_4': 'HEADER_4',
  'BODY_1': 'BODY_1',
  'BODY_2': 'BODY_2',
  'NOTE': 'NOTE',
}

export const textStyles = {
  [TEXT_TYPE.HEADER_1]: `
    font-family: ${Font};
    font-size: 40px;
    line-height: 38px;
    letter-spacing: -0.04em;
  `,
  [TEXT_TYPE.HEADER_2]: `
    font-family: ${Font};
    font-size: 30px;
    font-weight: 600;
    line-height: 34px;
  `,
  [TEXT_TYPE.HEADER_3]: `
    font-family: ${Font};
    font-size: 26px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: -0.04em;
  `,
  [TEXT_TYPE.HEADER_4]: `
    font-family: ${Font};
    font-size: 24px;
    font-weight: 500;
    line-height: 26px;
    letter-spacing: -0.03em;
  `,
  [TEXT_TYPE.BODY_1]: `
    font-family: ${Font};
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.03em;
  `,
  [TEXT_TYPE.BODY_2]: `
    font-family: ${Font};
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.01em;
  `,
  [TEXT_TYPE.NOTE]: `
  font-family: ${Font};
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.01em;
`,
}
