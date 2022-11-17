import type { BigNumber } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import type { Token } from "~/types";
import { Decimal } from "decimal.js-light";

const toDecimal = (value: BigNumber, decimals = 18) => {
  Decimal.set({ precision: decimals });
  return new Decimal(formatUnits(value, decimals));
};

export const parseBigNumber = (value: BigNumber, decimals = 18) =>
  toDecimal(value, decimals);

export const formatBigNumber = (value: BigNumber, decimals = 18) =>
  toDecimal(value, decimals)
    .toSignificantDigits(6, Decimal.ROUND_FLOOR)
    .toString();

export const toBigNumber = (value: string | number, decimals = 18) =>
  parseUnits(value.toString(), decimals);

export const formatNumber = (value: number) => {
  const numString = value.toString();
  if (value < 1) {
    return numString.substring(0, 8);
  }

  const [wholeDigits, fractionDigits] = numString.split(".");
  const formattedWholeDigits = parseFloat(wholeDigits).toLocaleString("en-US");
  if (!fractionDigits || wholeDigits.length >= 6) {
    return formattedWholeDigits;
  }

  return `${formattedWholeDigits}.${fractionDigits.substring(
    0,
    6 - wholeDigits.length
  )}`;
};

export const formatAndParseNumber = (value: number) =>
  parseFloat(formatNumber(value).replace(/,/g, ""));

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

export const formatPercent = (
  value: number,
  minimumFractionDigits = 0,
  maximumFractionDigits = 2
) =>
  `${(value * 100).toLocaleString("en-US", {
    minimumFractionDigits,
    maximumFractionDigits,
  })}%`;

export const formatTokenAmountInWei = (token: Token, amount: number) =>
  parseUnits(amount.toFixed(token.decimals));
