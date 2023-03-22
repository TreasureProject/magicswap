import type { BigNumber } from "@ethersproject/bignumber";
import type { PairToken } from "~/types";
import { toNumber } from "./number";

export const calculatePriceImpact = (
  inputToken: PairToken,
  outputToken: PairToken,
  amountIn: BigNumber,
  amountOut: BigNumber,
  isExactOut = false
) => {
  const parsedAmountIn = toNumber(amountIn, inputToken.decimals);
  const parsedAmountOut = toNumber(amountOut, outputToken.decimals);
  return isExactOut
    ? 1 - (parsedAmountOut * inputToken.price) / parsedAmountIn
    : 1 - parsedAmountOut / (parsedAmountIn * outputToken.price);
};

export const calculateAmountInMin = (amountIn: BigNumber, slippage: number) =>
  amountIn.add(amountIn.mul(slippage * 1000).div(1000));

export const calculateAmountOutMin = (amountOut: BigNumber, slippage: number) =>
  amountOut.sub(amountOut.mul(slippage * 1000).div(1000));
