import type {
  GetSwapPairQuery,
  Pair_Filter,
} from "~/graphql/exchange.generated";
import type { Optional, Pair } from "~/types";
import { exchangeSdk } from "./api.server";
import { getEthUsd, normalizeAdvancedToken } from "./tokens.server";

type RawPair = GetSwapPairQuery["pairs"][0];

const normalizePair = (
  {
    id,
    name,
    token0,
    token1,
    token0Price,
    token1Price,
    reserve0,
    reserve1,
    reserveUSD,
    totalSupply: rawTotalSupply,
    hourData,
    dayData,
  }: RawPair,
  ethUsd = 0
): Pair => {
  const liquidityUsd = parseFloat(reserveUSD);
  const totalSupply = parseFloat(rawTotalSupply);
  return {
    id,
    name: name,
    token0: {
      ...normalizeAdvancedToken(token0, ethUsd),
      price: parseFloat(token0Price),
      reserve: parseFloat(reserve0),
    },
    token1: {
      ...normalizeAdvancedToken(token1, ethUsd),
      price: parseFloat(token1Price),
      reserve: parseFloat(reserve1),
    },
    totalSupply,
    liquidityUsd,
    lpPriceUsd: liquidityUsd / totalSupply,
    liquidity1dUsdIntervals: hourData.map(({ date, reserveUSD }) => ({
      date,
      value: parseFloat(reserveUSD),
    })),
    liquidity1wUsdIntervals: dayData.map(({ date, reserveUSD }) => ({
      date,
      value: parseFloat(reserveUSD),
    })),
    volume1dUsdIntervals: hourData.map(({ date, volumeUSD }) => ({
      date,
      value: parseFloat(volumeUSD),
    })),
    volume1wUsdIntervals: dayData.map(({ date, volumeUSD }) => ({
      date,
      value: parseFloat(volumeUSD),
    })),
    volume1dUsd: hourData.reduce(
      (total, { volumeUSD }) => total + parseFloat(volumeUSD),
      0
    ),
    volume1wUsd: dayData.reduce(
      (total, { volumeUSD }) => total + parseFloat(volumeUSD),
      0
    ),
  };
};

export const getPair = async (
  tokenA: string,
  tokenB: string
): Promise<Optional<Pair>> => {
  const [token0, token1] = [tokenA, tokenB].sort();
  const [
    ethUsd,
    {
      pairs: [pair],
    },
  ] = await Promise.all([
    getEthUsd(),
    exchangeSdk.getSwapPair({
      token0,
      token1,
    }),
  ]);

  if (!pair) {
    return undefined;
  }

  return normalizePair(pair, ethUsd);
};

export const getPairById = async (id: string): Promise<Optional<Pair>> => {
  const [ethUsd, { pair }] = await Promise.all([
    getEthUsd(),
    exchangeSdk.getPair({ id }),
  ]);

  if (!pair) {
    return undefined;
  }

  return normalizePair(pair, ethUsd);
};

export const getPairs = async (where?: Pair_Filter): Promise<Pair[]> => {
  const [ethUsd, { pairs }] = await Promise.all([
    getEthUsd(),
    exchangeSdk.getPairs({
      where: {
        ...where,
        reserveETH_gt: 0,
      },
    }),
  ]);
  return pairs.map((pair) => normalizePair(pair as RawPair, ethUsd));
};
