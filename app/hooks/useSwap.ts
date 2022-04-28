import { utils } from "ethers";
import { useAccount, useContractWrite } from "wagmi";

import { Pair, Token } from "~/types";

import UniswapV2Router02Abi from "../../artifacts/UniswapV2Router02.json";

const contractConfig = {
  addressOrName: "0x0a073b830cd4247d518c4f0d1bafd6edf7af507b",
  contractInterface: UniswapV2Router02Abi,
};

export const useSwap = () => {
  const { data: accountData } = useAccount();
  const { write: writeSwapEthForExactTokens } = useContractWrite(
    contractConfig,
    "swapETHForExactTokens"
  );

  const { write: writeSwapExactEthForTokens } = useContractWrite(
    contractConfig,
    "swapExactETHForTokens"
  );

  const { write: writeSwapExactTokensForEth } = useContractWrite(
    contractConfig,
    "swapExactTokensForETH"
  );

  const { write: writeSwapTokensForExactEth } = useContractWrite(
    contractConfig,
    "swapTokensForExactETH"
  );

  const { write: writeSwapExactTokensForTokens } = useContractWrite(
    contractConfig,
    "swapExactTokensForTokens"
  );

  const { write: writeSwapTokensForExactTokens } = useContractWrite(
    contractConfig,
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
      (rawAmountOut * (isExactOut ? 1 : slippageMultiplier)).toFixed(outputToken.decimals)
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
