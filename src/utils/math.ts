import { getFallbackDisplayForNonValue } from './misc';

export const isNumeric = (num: string | number) =>
  !Number.isNaN(Number.parseFloat(String(num)));

export const isNumericStrict = (num: string | number) =>
  !isNaN(Number(num)) && isNumeric(num);

export const precisionRound = (number: number | string, precision = 2) => {
  const factor = Math.pow(10, precision);
  return Math.round(Number.parseFloat(String(number)) * factor) / factor;
};

export const precisionFixed = (number: number | string, precision: number) => {
  const result = precisionRound(number, precision);
  return result.toFixed(precision);
};

export const toDisplayString = (
  number: number | string,
  { precision = 2, fixed = false } = {}
) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: fixed ? precision : 0,
    maximumFractionDigits: precision,
  }).format(Number(number));
};

export const toCompactDisplayString = (
  number: number | string,
  precision = 2
) => {
  const fixedNumber = precisionRound(number, precision);
};

export const convertToUnit = (
  str: string | number | null | undefined,
  unit = 'px'
): string | undefined => {
  if (str == null || str === '') {
    return undefined;
  } else if (isNumeric(str)) {
    return `${Number(str)}${unit}`;
  } else {
    return String(str);
  }
};
