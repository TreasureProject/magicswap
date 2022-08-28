import type { AdvancedToken } from "~/types";
import { getFormatOptions } from "./number";

export const LIQUIDITY_PROVIDER_FEE = 0.0225;
export const COMMUNITY_GAME_FUND = 0.00375;
export const COMMUNITY_ECO_FUND = 0.00375;
export const TOTAL_FEE =
  LIQUIDITY_PROVIDER_FEE + COMMUNITY_GAME_FUND + COMMUNITY_ECO_FUND;
export const ARBITRUM_MAGIC_ADDRESS =
  "0x539bde0d7dbd336b79148aa742883198bbf60342";

export const aprToApy = (apr: number, frequency = 3650) =>
  ((1 + apr / 100 / frequency) ** frequency - 1) * 100;

export const getApy = (volume: number, liquidity: number) =>
  aprToApy(((volume / 7) * 365 * 0.0025) / liquidity);

export const getLpTokenCount = (
  tokenCount: number,
  tokenReserve: number,
  lpTotalSupply: number
) => (tokenReserve > 0 ? (tokenCount / tokenReserve) * lpTotalSupply : 0);

export const getTokenCount = (
  lpCount: number,
  tokenReserve: number,
  lpTotalSupply: number
) => (lpTotalSupply > 0 ? (lpCount / lpTotalSupply) * tokenReserve : 0);

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

export const fetchMagicPrice = async () =>
  (await fetch("https://token-price.sushi.com/v0/42161")).json();
