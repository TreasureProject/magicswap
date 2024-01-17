import { Decimal } from "decimal.js-light";
import { formatUnits, parseUnits } from "viem";

// Avoid scientific notation
Decimal.set({ toExpPos: 18, toExpNeg: -18 });

const toDecimal = (value: bigint, decimals = 18) =>
  new Decimal(formatUnits(value, decimals));

export const toNumber = (value: bigint, decimals = 18) =>
  parseFloat(formatUnits(value, decimals));

export const toBigInt = (value: string | number, decimals = 18) =>
  parseUnits(new Decimal(value).toString(), decimals);

export const formatBigIntInput = (value: bigint, decimals = 18) =>
  toDecimal(value, decimals)
    .toSignificantDigits(decimals, Decimal.ROUND_FLOOR)
    .toString();

export const formatBigIntOutput = (value: bigint, decimals = 18) =>
  toDecimal(value, decimals)
    .toSignificantDigits(6, Decimal.ROUND_FLOOR)
    .toString();

export const formatBigIntDisplay = (value: bigint, decimals = 18) =>
  toDecimal(value, decimals)
    .toSignificantDigits(6, Decimal.ROUND_FLOOR)
    .toNumber()
    .toLocaleString("en-US");

export const formatAmount = (value: string | number, toLocale = true) => {
  const decimal = new Decimal(value);
  let decimalPlaces: number;
  if (decimal.lt(1e-3)) {
    decimalPlaces = 6;
  } else if (decimal.lt(1)) {
    decimalPlaces = 4;
  } else if (decimal.lt(100)) {
    decimalPlaces = 3;
  } else {
    decimalPlaces = 2;
  }

  const rounded = decimal.toDecimalPlaces(decimalPlaces, Decimal.ROUND_DOWN);

  if (toLocale) {
    return rounded
      .toNumber()
      .toLocaleString("en-US", { maximumFractionDigits: decimalPlaces });
  }

  return rounded.toString();
};

export const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

export const formatUsd = (value: number) =>
  `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const formatUsdLong = (value: number) => {
  let significantDigits = 4;
  let maximumFractionDigits = 2;
  if (value < 1) {
    maximumFractionDigits = 3;
    if (value < 0.01) {
      significantDigits = 6;
      maximumFractionDigits = 6;
    }
  }

  return `$${new Decimal(value)
    .toSignificantDigits(significantDigits)
    .toNumber()
    .toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits,
    })}`;
};

export const formatPercent = (
  value: number,
  minimumFractionDigits = 0,
  maximumFractionDigits = 2,
) =>
  `${(value * 100).toLocaleString("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
  })}%`;
