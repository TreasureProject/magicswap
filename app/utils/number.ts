import { parseUnits } from "ethers/lib/utils";
import type { Token } from "~/types";

export const formatNumber = (value: number) => {
  const numString = value.toString();
  if (value < 1) {
    return numString.substring(0, 8);
  }

  const [wholeDigits, fractionDigits] = numString.split(".");
  const formattedWholeDigits = parseFloat(wholeDigits).toLocaleString();
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
