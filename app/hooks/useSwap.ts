import { utils } from "ethers";
import { useAccount } from "wagmi";

import { Token } from "~/types";

import { useV2RouterWrite } from "./useV2RouterWrite";

export const useSwap = () => {
  const { data: accountData } = useAccount();
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
    slippage = 0.5
  ) => {
    const slippageMultiplier = (100 - slippage) / 100;
    const isOutputEth = outputToken.symbol === "WETH";
    const isEth = inputToken.symbol === "WETH" || isOutputEth;

    const amountIn = utils.parseUnits(rawAmountIn.toFixed(inputToken.decimals));
    const amountOut = utils.parseUnits(
      (rawAmountOut * (isExactOut ? 1 : slippageMultiplier)).toFixed(
        outputToken.decimals
      )
    );
    const path = [inputToken.id, outputToken.id];
    const deadline = (Math.ceil(Date.now() / 1000) + 60 * 30).toString(); // 30 minutes from now

    if (isExactOut) {
      if (isEth) {
        if (isOutputEth) {
          writeSwapTokensForExactEth({
            args: [
              amountOut, // amountOut
              amountIn, // amountInMax
              path,
              accountData?.address,
              deadline,
            ],
          });
        } else {
          writeSwapEthForExactTokens({
            overrides: {
              value: amountIn,
            },
            args: [
              amountOut, // amountOut
              path,
              accountData?.address,
              deadline,
            ],
          });
        }
      } else {
        writeSwapTokensForExactTokens({
          args: [
            amountOut, // amountOut
            amountIn, // amountInMax
            path,
            accountData?.address,
            deadline,
          ],
        });
      }
    } else {
      if (isEth) {
        if (isOutputEth) {
          writeSwapExactTokensForEth({
            args: [
              amountIn, // amountIn
              amountOut, // amountOutMin
              path,
              accountData?.address,
              deadline,
            ],
          });
        } else {
          writeSwapExactEthForTokens({
            overrides: {
              value: amountIn,
            },
            args: [
              amountOut, // amountOutMin
              path,
              accountData?.address,
              deadline,
            ],
          });
        }
      } else {
        writeSwapExactTokensForTokens({
          args: [
            amountIn, // amountIn
            amountOut, // amountOutMin
            path,
            accountData?.address,
            deadline,
          ],
        });
      }
    }
  };
};
