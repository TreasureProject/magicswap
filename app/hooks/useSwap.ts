import { utils } from "ethers";
import { useAccount, useContractWrite } from "wagmi";

import { Pair } from "~/types";

import UniswapV2Router02Abi from "../../artifacts/UniswapV2Router02.json";

const contractConfig = {
  addressOrName: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
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
    pair: Pair,
    rawAmountIn: number,
    rawAmountOut: number,
    isExactOut = false,
    slippage = 0.5
  ) => {
    const slippageMultiplier = (100 - slippage) / 100;
    const isToken1Eth = pair.token1.symbol === "WETH";
    const isEth = pair.token0.symbol === "WETH" || isToken1Eth;

    const amountIn = utils.parseUnits(
      rawAmountIn.toFixed(pair.token0.decimals)
    );
    const amountOut = utils.parseUnits(
      rawAmountOut.toFixed(pair.token1.decimals)
    );
    const path = [pair.token0.id, pair.token1.id];
    const deadline = (Math.ceil(Date.now() / 1000) + 60 * 30).toString(); // 30 minutes from now

    if (isExactOut) {
      if (isEth) {
        if (isToken1Eth) {
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
        if (isToken1Eth) {
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
