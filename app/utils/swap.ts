import {
  ConstantProductRPool,
  type NetworkInfo,
  type RToken,
  findMultiRouteExactIn,
  findMultiRouteExactOut,
} from "@sushiswap/tines";
import { parseUnits } from "viem";

import { TOTAL_FEE } from "./price";
import type { Pair, Token } from "~/types";

export const calculateAmountInMin = (amountIn: bigint, slippage: number) =>
  amountIn + (amountIn * BigInt(slippage * 1000)) / 1000n;

export const calculateAmountOutMin = (amountOut: bigint, slippage: number) =>
  amountOut - (amountOut * BigInt(slippage * 1000)) / 1000n;

export const tokenToRToken = ({
  name,
  symbol,
  id: address,
  decimals,
}: Token): RToken => ({
  name,
  symbol,
  address,
  decimals,
});

export const createSwapRoute = ({
  tokenIn,
  tokenOut,
  pools,
  amount,
  isExactOut,
}: {
  tokenIn: Token;
  tokenOut: Token;
  pools: Pair[];
  amount: bigint;
  isExactOut: boolean;
}) => {
  if (amount <= 0 || !tokenOut) {
    return undefined;
  }

  const rTokenIn = tokenToRToken(tokenIn);
  const rTokenOut = tokenToRToken(tokenOut);
  const rPools = pools.map(
    ({ id, token0, token1, reserve0 = 0, reserve1 = 0 }) => {
      return new ConstantProductRPool(
        id,
        tokenToRToken(token0),
        tokenToRToken(token1),
        TOTAL_FEE,
        parseUnits(reserve0.toString(), token0.decimals),
        parseUnits(reserve1.toString(), token0.decimals),
      );
    },
  );
  const networks: NetworkInfo[] = [
    {
      baseToken: {
        name: "ETH",
        symbol: "ETH",
        address: "0x0",
        decimals: 18,
      },
      gasPrice: 0,
    },
  ];

  if (isExactOut) {
    return findMultiRouteExactOut(
      rTokenIn,
      rTokenOut,
      amount,
      rPools,
      networks,
    );
  }

  return findMultiRouteExactIn(rTokenIn, rTokenOut, amount, rPools, networks);
};
