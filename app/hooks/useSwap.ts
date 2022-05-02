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
    const isOutputEth = outputToken.isEth;
    const isEth = inputToken.isEth || isOutputEth;

    const worstAmountIn =
      rawAmountIn * (isExactOut ? (100 + slippage) / 100 : 1);
    const worstAmountOut =
      rawAmountOut * (isExactOut ? 1 : (100 - slippage) / 100);

    const amountIn = utils.parseUnits(
      worstAmountIn.toFixed(inputToken.decimals)
    );
    const amountOut = utils.parseUnits(
      worstAmountOut.toFixed(outputToken.decimals)
    );
    const path = [inputToken.id, outputToken.id];

    const transactionDeadline = (
      Math.ceil(Date.now() / 1000) +
      60 * deadline
    ).toString();

    const statusHeader = `Swap ${formatNumber(rawAmountIn)} ${
      inputToken.symbol
    } to ${formatNumber(rawAmountOut)} ${outputToken.symbol}`;

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
