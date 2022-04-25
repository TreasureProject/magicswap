import { GetSwapPairQuery } from "~/graphql/exchange.generated";
import { Optional, Pair } from "~/types";
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
  ethUsd: number = 0
): Pair => {
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
    lpPrice: parseFloat(reserveUSD) / totalSupply,
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
