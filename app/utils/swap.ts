import type { BigNumber } from "ethers";
import type { PairToken } from "~/types";
import { parseBigNumber } from "./number";

export const calculatePriceImpact = (
  inputToken: PairToken,
  outputToken: PairToken,
  amountIn: BigNumber,
  amountOut: BigNumber,
  isExactOut = false
) => {
  const parsedAmountIn = parseBigNumber(amountIn).toNumber();
  const parsedAmountOut = parseBigNumber(amountOut).toNumber();
  return isExactOut
    ? 1 - (parsedAmountOut * inputToken.price) / parsedAmountIn
    : 1 - parsedAmountOut / (parsedAmountIn * outputToken.price);
};

export const calculateWorstAmountIn = (amountIn: BigNumber, slippage: number) =>
  amountIn.mul(1 + slippage / 100);

export const calculateWorstAmountOut = (
  amountOut: BigNumber,
  slippage: number
) => amountOut.mul(1 + slippage / 100);
