export type Optional<T> = T | undefined;

export type AddressString = `0x${string}`;

export type TimeInterval = {
  date: number;
  value: number;
};

export type Token = {
  id: AddressString;
  symbol: string;
  isEth: boolean;
  isMagic: boolean;
  name: string;
  image?: string;
  decimals: number;
  priceMagic: number;
};

export type AdvancedToken = Token & {
  price1dUsdIntervals: TimeInterval[];
  price1wUsdIntervals: TimeInterval[];
  volume1dMagic: number;
  volume1wMagic: number;
};

export type PairToken = AdvancedToken & {
  price: number;
  reserve: number;
};

export type Pair = {
  id: `0x${string}`;
  name: string;
  token0: PairToken;
  token1: PairToken;
  hasEth: boolean;
  hasMagic: boolean;
  totalSupply: number;
  liquidityMagic: number;
  lpPriceMagic: number;
  liquidity1dMagicIntervals: TimeInterval[];
  liquidity1wMagicIntervals: TimeInterval[];
  volume1dMagicIntervals: TimeInterval[];
  volume1wMagicIntervals: TimeInterval[];
  volume1dMagic: number;
  volume1wMagic: number;
  apy: number;
};

export type Swap = {
  id: string;
  date: number;
  formattedDate: string;
  transactionId: string;
  userAddress: string;
  isAmount0In: boolean;
  isAmount0Out: boolean;
  inAmount: number;
  outAmount: number;
};
