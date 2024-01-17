import type { AdvancedToken } from "~/types";

export const LIQUIDITY_PROVIDER_FEE = 0.0225;
export const COMMUNITY_GAME_FUND = 0.00375;
export const COMMUNITY_ECO_FUND = 0.00375;
export const TOTAL_FEE =
  LIQUIDITY_PROVIDER_FEE + COMMUNITY_GAME_FUND + COMMUNITY_ECO_FUND;

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

export const fetchMagicPrice = async (): Promise<{
  magicUsd: number;
}> => {
  const response = await fetch("https://api.treasure.lol/magic/price");
  return response.json();
};
