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
  const parsedAmountIn = parseBigNumber(
    amountIn,
    inputToken.decimals
  ).toNumber();
  const parsedAmountOut = parseBigNumber(
    amountOut,
    outputToken.decimals
  ).toNumber();
  return isExactOut
    ? 1 - (parsedAmountOut * inputToken.price) / parsedAmountIn
    : 1 - parsedAmountOut / (parsedAmountIn * outputToken.price);
};

export const calculateAmountInMin = (amountIn: BigNumber, slippage: number) =>
  amountIn.add(amountIn.mul(slippage * 1000).div(1000));

export const calculateAmountOutMin = (amountOut: BigNumber, slippage: number) =>
  amountOut.sub(amountOut.mul(slippage * 1000).div(1000));
