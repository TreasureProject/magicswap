export type Optional<T> = T | undefined;

type TimeInterval = {
  date: number;
  value: number;
};

export type Token = {
  id: string;
  symbol: string;
  name: string;
  priceEth: number;
};

export type AdvancedToken = Token & {
  priceUsd: number;
  price24hChange: number;
  price1dUsd: TimeInterval[];
  price1wUsd: TimeInterval[];
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
  lpPrice: number;
  volume1dUsd: number;
  volume1wUsd: number;
};
