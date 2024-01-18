import invariant from "tiny-invariant";

import { exchangeSdk } from "./api";
import { getApy } from "./price";
import { normalizeAdvancedToken } from "./tokens";
import { SUPPORTED_CONTRACT_ADDRESSES } from "~/const";
import type {
  GetSwapPairQuery,
  Pair_Filter,
} from "~/graphql/exchange.generated";
import type { AddressString, Optional, Pair } from "~/types";

type RawPair = GetSwapPairQuery["pairs"][0];

const normalizePair = ({
  id,
  token0: rawToken0,
  token1: rawToken1,
  token0Price,
  token1Price,
  reserve0,
  reserve1,
  reserveETH,
  totalSupply: rawTotalSupply,
  hourData,
  dayData,
}: RawPair): Pair => {
  const token0 = {
    ...normalizeAdvancedToken(rawToken0),
    price: parseFloat(token0Price),
    reserve: parseFloat(reserve0),
  };
  const token1 = {
    ...normalizeAdvancedToken(rawToken1),
    price: parseFloat(token1Price),
    reserve: parseFloat(reserve1),
  };
  const liquidityMagic = parseFloat(reserveETH);
  const totalSupply = parseFloat(rawTotalSupply);
  const volume1wMagic = dayData.reduce(
    (total, { volumeToken0, volumeToken1 }) =>
      total + parseFloat(token0.isMagic ? volumeToken0 : volumeToken1),
    0,
  );
  return {
    id: id as AddressString,
    name: `${token0.symbol}-${token1.symbol}`,
    token0,
    token1,
    hasEth: token0.isEth || token1.isEth,
    hasMagic: token0.isMagic || token1.isMagic,
    totalSupply,
    liquidityMagic,
    lpPriceMagic: liquidityMagic / totalSupply,
    liquidity1dMagicIntervals: hourData.map(({ date, reserve0, reserve1 }) => ({
      date,
      value: parseFloat(token0.isMagic ? reserve0 : reserve1) * 2,
    })),
    liquidity1wMagicIntervals: dayData.map(({ date, reserve0, reserve1 }) => ({
      date,
      value: parseFloat(token0.isMagic ? reserve0 : reserve1) * 2,
    })),
    volume1dMagicIntervals: hourData.map(
      ({ date, volumeToken0, volumeToken1 }) => ({
        date,
        value: parseFloat(token0.isMagic ? volumeToken0 : volumeToken1),
      }),
    ),
    volume1wMagicIntervals: dayData.map(
      ({ date, volumeToken0, volumeToken1 }) => ({
        date,
        value: parseFloat(token0.isMagic ? volumeToken0 : volumeToken1),
      }),
    ),
    volume1dMagic: hourData.reduce(
      (total, { volumeToken0, volumeToken1 }) =>
        total + parseFloat(token0.isMagic ? volumeToken0 : volumeToken1),
      0,
    ),
    volume1wMagic,
    apy: getApy(volume1wMagic, liquidityMagic),
  };
};

export const getPair = async (
  tokenA: string,
  tokenB: string,
): Promise<Optional<Pair>> => {
  const [token0, token1] = [tokenA, tokenB].sort();
  invariant(token0);
  invariant(token1);
  const {
    pairs: [pair],
  } = await exchangeSdk.getSwapPair({
    token0,
    token1,
  });

  if (!pair) {
    return undefined;
  }

  return normalizePair(pair);
};

export const getPairById = async (id: string): Promise<Optional<Pair>> => {
  const { pair } = await exchangeSdk.getPair({ id });

  if (!pair) {
    return undefined;
  }

  return normalizePair(pair);
};

export const getPairs = async (where?: Pair_Filter): Promise<Pair[]> => {
  const { pairs } = await exchangeSdk.getPairs({
    where: {
      ...where,
      id_in: SUPPORTED_CONTRACT_ADDRESSES,
      reserveETH_gt: 0,
    },
  });
  return pairs.map((pair) => normalizePair(pair as RawPair));
};
