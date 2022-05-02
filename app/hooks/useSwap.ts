import { utils } from "ethers";
import { useUser } from "~/context/userContext";

import type { Token } from "~/types";
import { formatNumber } from "~/utils/number";

import { useV2RouterWrite } from "./useV2RouterWrite";

export const useSwap = () => {
  const { accountData } = useUser();
  const { write: writeSwapEthForExactTokens } = useV2RouterWrite(
    "swapETHForExactTokens"
  );
  const { write: writeSwapExactEthForTokens } = useV2RouterWrite(
    "swapExactETHForTokens"
  );
  const { write: writeSwapExactTokensForEth } = useV2RouterWrite(
    "swapExactTokensForETH"
  );
  const { write: writeSwapTokensForExactEth } = useV2RouterWrite(
    "swapTokensForExactETH"
  );
  const { write: writeSwapExactTokensForTokens } = useV2RouterWrite(
    "swapExactTokensForTokens"
  );
  const { write: writeSwapTokensForExactTokens } = useV2RouterWrite(
    "swapTokensForExactTokens"
  );

  return (
    inputToken: Token,
    outputToken: Token,
    rawAmountIn: number,
    rawAmountOut: number,
    isExactOut = false,
    slippage: number,
    deadline: number
  ) => {
    const slippageMultiplier = (100 - slippage) / 100;
    const isOutputEth = outputToken.symbol === "WETH";
    const isEth = inputToken.symbol === "WETH" || isOutputEth;

    const expectedAmountIn = rawAmountIn;
    const expectedAmountOut =
      rawAmountOut * (isExactOut ? 1 : slippageMultiplier);

    const amountIn = utils.parseUnits(
      expectedAmountIn.toFixed(inputToken.decimals)
    );
    const amountOut = utils.parseUnits(
      expectedAmountOut.toFixed(outputToken.decimals)
    );
    const path = [inputToken.id, outputToken.id];
    const transactionDeadline = (
      Math.ceil(Date.now() / 1000) +
      60 * deadline
    ).toString();
    console.log(transactionDeadline);
    const statusHeader = `Swap ${formatNumber(expectedAmountIn)} ${
      inputToken.symbol
    } to ${formatNumber(expectedAmountOut)} ${outputToken.symbol}`;

    if (isExactOut) {
      if (isEth) {
        if (isOutputEth) {
          writeSwapTokensForExactEth(
            {
              args: [
                amountOut, // amountOut
                amountIn, // amountInMax
                path,
                accountData?.address,
                transactionDeadline,
              ],
            },
            statusHeader
          );
        } else {
          writeSwapEthForExactTokens(
            {
              overrides: {
                value: amountIn,
              },
              args: [
                amountOut, // amountOut
                path,
                accountData?.address,
                transactionDeadline,
              ],
            },
            statusHeader
          );
        }
      } else {
        writeSwapTokensForExactTokens(
          {
            args: [
              amountOut, // amountOut
              amountIn, // amountInMax
              path,
              accountData?.address,
              transactionDeadline,
            ],
          },
          statusHeader
        );
      }
    } else {
      if (isEth) {
        if (isOutputEth) {
          writeSwapExactTokensForEth(
            {
              args: [
                amountIn, // amountIn
                amountOut, // amountOutMin
                path,
                accountData?.address,
                transactionDeadline,
              ],
            },
            statusHeader
          );
        } else {
          writeSwapExactEthForTokens(
            {
              overrides: {
                value: amountIn,
              },
              args: [
                amountOut, // amountOutMin
                path,
                accountData?.address,
                transactionDeadline,
              ],
            },
            statusHeader
          );
        }
      } else {
        writeSwapExactTokensForTokens(
          {
            args: [
              amountIn, // amountIn
              amountOut, // amountOutMin
              path,
              accountData?.address,
              transactionDeadline,
            ],
          },
          statusHeader
        );
      }
    }
  };
};
