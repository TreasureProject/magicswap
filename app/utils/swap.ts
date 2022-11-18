import { Zero } from "@ethersproject/constants";
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

export const calculateWorstAmountIn = (amountIn: BigNumber, slippage: number) =>
  amountIn.gt(Zero) ? amountIn.mul(1 + slippage / 100) : Zero;

export const calculateWorstAmountOut = (
  amountOut: BigNumber,
  slippage: number
) =>
  amountOut.gt(Zero)
    ? amountOut.sub(
        slippage > 1
          ? amountOut.mul(slippage).div(100)
          : amountOut.div(1 / slippage).div(100)
      )
    : Zero;
