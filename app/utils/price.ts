export const getApr = (volume: number, liquidity: number) =>
  ((((volume / 7) * 365 * 0.0025) / liquidity) * 100)
    .toFixed(2)
    .replace(".00", "");
