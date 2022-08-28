import { utils } from "ethers";
import type { Token } from "~/types";

export const getFormatOptions = (value: number, isUsd = false) => {
  const formatOptions: Intl.NumberFormatOptions = {};

  if (isUsd) {
    formatOptions.minimumFractionDigits = 2;
    formatOptions.maximumFractionDigits = 2;
  } else {
    formatOptions.maximumSignificantDigits = value < 1 ? 8 : 6;
  }

  return formatOptions;
};

export const formatNumber = (value: number) =>
  value.toLocaleString("en-US", getFormatOptions(value));

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
  utils.parseUnits(amount.toFixed(token.decimals));
