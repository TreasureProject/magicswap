import { formatUnits, parseUnits } from "ethers/lib/utils";
import { Decimal } from "decimal.js-light";
import type { BigNumber } from "@ethersproject/bignumber";

// Avoid scientific notation
Decimal.set({ toExpPos: 18, toExpNeg: -18 });

const toDecimal = (value: BigNumber, decimals = 18) =>
  new Decimal(formatUnits(value, decimals));

export const toNumber = (value: BigNumber, decimals = 18) =>
  parseFloat(formatUnits(value, decimals));

export const toBigNumber = (value: string | number, decimals = 18) =>
  parseUnits(new Decimal(value).toString(), decimals);

export const formatBigNumberInput = (value: BigNumber, decimals = 18) =>
  toDecimal(value, decimals)
    .toSignificantDigits(decimals, Decimal.ROUND_FLOOR)
    .toString();

export const formatBigNumberOutput = (value: BigNumber, decimals = 18) =>
  toDecimal(value, decimals)
    .toSignificantDigits(6, Decimal.ROUND_FLOOR)
    .toString();

export const formatBigNumberDisplay = (value: BigNumber, decimals = 18) =>
  toDecimal(value, decimals)
    .toSignificantDigits(6, Decimal.ROUND_FLOOR)
    .toNumber()
    .toLocaleString("en-US");

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

export const formatUsdLong = (value: number) =>
  `$${new Decimal(value)
    .toSignificantDigits(4)
    .toNumber()
    .toLocaleString("en-US", {
      minimumFractionDigits: 2,
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
