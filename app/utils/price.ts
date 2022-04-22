const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const getApr = (volume: number, liquidity: number) =>
  ((((volume / 7) * 365 * 0.0025) / liquidity) * 100)
    .toFixed(2)
    .replace(".00", "");

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

export const formatUsd = usdFormatter.format;

export const formatNumber = (
  value: number,
  maximumFractionDigits: number = 5
) =>
  value.toLocaleString("en-US", {
    maximumFractionDigits,
  });
