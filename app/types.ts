export type Optional<T> = T | undefined;

export type TimeInterval = {
  date: number;
  value: number;
};

export type Token = {
  id: string;
  symbol: string;
  isEth: boolean;
  isMagic: boolean;
  name: string;
  decimals: number;
  priceMagic: number;
};

export type AdvancedToken = Token & {
  priceUsd: number;
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
  hasEth: boolean;
  hasMagic: boolean;
  totalSupply: number;
  liquidityUsd: number;
  lpPriceUsd: number;
  liquidity1dUsdIntervals: TimeInterval[];
  liquidity1wUsdIntervals: TimeInterval[];
  volume1dUsdIntervals: TimeInterval[];
  volume1wUsdIntervals: TimeInterval[];
  volume1dUsd: number;
  volume1wUsd: number;
  apy: number;
};

export type Swap = {
  id: string;
  date: number;
  formattedDate: string;
  transactionId: string;
  isAmount0In: boolean;
  isAmount0Out: boolean;
  inAmount: number;
  outAmount: number;
  amountUsd: number;
};

export type CloudFlareEnvVar =
  | "NODE_ENV"
  | "ENABLE_TESTNETS"
  | "EXCHANGE_ENDPOINT"
  | "SUSHISWAP_EXCHANGE_ENDPOINT"
  | "ALCHEMY_KEY"
  | "UNISWAP_V2_ROUTER_ADDRESS";

export type CloudFlareEnv = {
  [key in CloudFlareEnvVar]: string;
};

export type TokenImageList = {
  name: string;
  timestamp: Date;
  version: {
    major: number;
    minor: number;
    patch: number;
  };
  tokens: {
    logoURI?: string;
    chainId: number;
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    extensions?: {
      bridgeInfo: {
        tokenAddress: string;
        originBridgeAddress: string;
        destBridgeAddress: string;
      };
      l1Address: string;
      l2GatewayAddress: string;
      l1GatewayAddress: string;
    };
  }[];
  logoURI: string;
};
