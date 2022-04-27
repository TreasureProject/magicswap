export type Optional<T> = T | undefined;

export type TimeInterval = {
  date: number;
  value: number;
};

export type Token = {
  id: string;
  symbol: string;
  name: string;
  decimals: number;
  priceEth: number;
};

export type AdvancedToken = Token & {
  priceUsd: number;
  price24hChange: number;
  price1dUsdIntervals: TimeInterval[];
  price1wUsdIntervals: TimeInterval[];
  volume1dUsd: number;
  volume1wUsd: number;
};

export type PairToken = AdvancedToken & {
  price: number;
  reserve: number;
};

export type Pair = {
  id: string;
  name: string;
  token0: PairToken;
  token1: PairToken;
  totalSupply: number;
  liquidityUsd: number;
  lpPriceUsd: number;
  liquidity1dUsdIntervals: TimeInterval[];
  liquidity1wUsdIntervals: TimeInterval[];
  volume1dUsdIntervals: TimeInterval[];
  volume1wUsdIntervals: TimeInterval[];
  volume1dUsd: number;
  volume1wUsd: number;
};

export type Swap = {
  id: string;
  date: number;
  formattedDate: string;
  isAmount0In: boolean;
  isAmount0Out: boolean;
  inAmount: number;
  outAmount: number;
  amountUsd: number;
};

export type CloudFlareEnvVar = "ALCHEMY_KEY";

export type CloudFlareEnv = {
  [key in CloudFlareEnvVar]: string;
};
