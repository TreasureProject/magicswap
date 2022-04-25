import { getFormatOptions } from "./number";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const getApr = (volume: number, liquidity: number) =>
  ((volume / 7) * 365 * 0.0025) / liquidity;

export const getLpTokenCount = (
  tokenCount: number,
  tokenReserve: number,
  lpTotalSupply: number
) => (tokenCount / tokenReserve) * lpTotalSupply;

export const getTokenCount = (
  lpCount: number,
  tokenReserve: number,
  lpTotalSupply: number
) => (lpCount / lpTotalSupply) * tokenReserve;

export const formatUsd = (value: number) =>
  `$${value.toLocaleString("en-US", getFormatOptions(value, true))}`;
