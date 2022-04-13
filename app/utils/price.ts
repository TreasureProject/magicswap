export const getApr = (volume: number, liquidity: number) =>
  Math.round((((volume / 7) * 365 * 0.0025) / liquidity) * 100);
