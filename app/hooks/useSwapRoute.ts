import { parseUnits } from "viem";

import type { AddressString, Pair, PairToken, Token } from "~/types";
import { multiplyArray } from "~/utils/array";
import {
  COMMUNITY_ECO_FUND,
  COMMUNITY_GAME_FUND,
  LIQUIDITY_PROVIDER_FEE,
} from "~/utils/price";
import { createSwapRoute } from "~/utils/swap";

type Props = {
  tokenIn: Token;
  tokenOut: Token;
  pools: Pair[];
  amount: string;
  isExactOut: boolean;
};

export const useSwapRoute = ({
  tokenIn,
  tokenOut,
  pools,
  amount,
  isExactOut,
}: Props) => {
  const amountBI =
    amount !== "."
      ? parseUnits(amount, isExactOut ? tokenOut.decimals : tokenIn.decimals)
      : 0n;
  const isSampleRoute = amountBI <= 0;

  const {
    amountInBI = 0n,
    amountOutBI = 0n,
    legs = [],
    priceImpact = 0,
  } = createSwapRoute({
    tokenIn,
    tokenOut,
    pools,
    amount: isSampleRoute ? 1n : amountBI,
    isExactOut,
  }) ?? {};

  const poolLegs = legs
    .map(({ poolAddress, tokenFrom, tokenTo }) => {
      const pool = pools.find((pool) => pool.id === poolAddress);
      if (!pool) {
        return undefined;
      }

      return {
        ...pool,
        tokenFrom:
          pool.token0.id === tokenFrom.address ? pool.token0 : pool.token1,
        tokenTo: pool.token0.id === tokenTo.address ? pool.token0 : pool.token1,
      };
    })
    .filter((leg) => !!leg) as (Pair & {
    tokenFrom: PairToken;
    tokenTo: PairToken;
  })[];

  let fallbackTokenIn: PairToken | undefined;
  let fallbackTokenOut: PairToken | undefined;
  pools.forEach(({ token0, token1 }) => {
    if (!fallbackTokenIn) {
      if (token0.id === tokenIn.id) {
        fallbackTokenIn = token0;
      } else if (token1.id === tokenIn.id) {
        fallbackTokenIn = token1;
      }
    }

    if (!fallbackTokenOut) {
      if (token0.id === tokenOut.id) {
        fallbackTokenOut = token0;
      } else if (token1.id === tokenOut.id) {
        fallbackTokenOut = token1;
      }
    }
  });

  return {
    amountIn: isSampleRoute ? 0n : amountInBI,
    amountOut: isSampleRoute ? 0n : amountOutBI,
    tokenIn: poolLegs[0]?.tokenFrom ?? fallbackTokenIn,
    tokenOut: poolLegs[poolLegs.length - 1]?.tokenTo ?? fallbackTokenOut,
    legs,
    path: poolLegs.flatMap(({ tokenFrom, tokenTo }, i) =>
      i === poolLegs.length - 1
        ? [tokenFrom.id as AddressString, tokenTo.id as AddressString]
        : (tokenFrom.id as AddressString),
    ),
    priceImpact,
    derivedValue: multiplyArray(
      poolLegs.map(
        ({ tokenFrom, tokenTo }) => tokenFrom.reserve / tokenTo.reserve,
      ),
    ),
    lpFee: LIQUIDITY_PROVIDER_FEE * poolLegs.length,
    gameFundFee: COMMUNITY_GAME_FUND * poolLegs.length,
    ecoFundFee: COMMUNITY_ECO_FUND * poolLegs.length,
  };
};

export type SwapRoute = ReturnType<typeof useSwapRoute>;
