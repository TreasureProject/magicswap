import { toNumber } from "./number";
import type { PairToken } from "~/types";

export const calculatePriceImpact = (
  inputToken: PairToken,
  outputToken: PairToken,
  amountIn: bigint,
  amountOut: bigint,
  isExactOut = false,
) => {
  const parsedAmountIn = toNumber(amountIn, inputToken.decimals);
  const parsedAmountOut = toNumber(amountOut, outputToken.decimals);
  return isExactOut
    ? 1 - (parsedAmountOut * inputToken.price) / parsedAmountIn
    : 1 - parsedAmountOut / (parsedAmountIn * outputToken.price);
};

export const calculateAmountInMin = (amountIn: bigint, slippage: number) =>
  amountIn + (amountIn * BigInt(slippage * 1000)) / 1000n;

export const calculateAmountOutMin = (amountOut: bigint, slippage: number) =>
  amountOut - (amountOut * BigInt(slippage * 1000)) / 1000n;
