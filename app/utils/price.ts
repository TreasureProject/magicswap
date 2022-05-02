import type { AdvancedToken } from "~/types";
import { getFormatOptions } from "./number";

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

export const getPrice24hChange = ({
  priceUsd,
  price1wUsdIntervals,
}: AdvancedToken) => {
  if (price1wUsdIntervals.length <= 1) {
    return 0;
  }

  const priceYesterdayUsd = price1wUsdIntervals[1].value;
  return parseFloat(
    ((priceUsd - priceYesterdayUsd) / priceYesterdayUsd).toFixed(4)
  );
};

export const formatUsd = (value: number) =>
  `$${value.toLocaleString("en-US", getFormatOptions(value, true))}`;
