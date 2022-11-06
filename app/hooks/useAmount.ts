import { formatEther } from "ethers/lib/utils";
import type { PairToken } from "~/types";
import { getEnvVariable } from "~/utils/env";
import { formatTokenAmountInWei } from "~/utils/number";
import UniswapV2Router02Abi from "../../artifacts/UniswapV2Router02.json";
import { useContractRead } from "./useContractRead";

const contractConfig = {
  addressOrName: getEnvVariable("UNISWAP_V2_ROUTER_ADDRESS"),
  contractInterface: UniswapV2Router02Abi,
};

export const useAmountIn = (
  tokenIn: PairToken,
  tokenOut: PairToken,
  amountOut: number
) => {
  const { data = "0" } = useContractRead({
    ...contractConfig,
    functionName: "getAmountIn",
    enabled: amountOut > 0,
    args: [
      formatTokenAmountInWei(tokenOut, amountOut),
      formatTokenAmountInWei(tokenIn, tokenIn.reserve),
      formatTokenAmountInWei(tokenOut, tokenOut.reserve),
    ],
    refetchInterval: 2_500,
  });
  return parseFloat(formatEther(data));
};

export const useAmountOut = (
  tokenIn: PairToken,
  tokenOut: PairToken,
  amountIn: number
) => {
  const { data = 0 } = useContractRead({
    ...contractConfig,
    functionName: "getAmountOut",
    enabled: amountIn > 0,
    args: [
      formatTokenAmountInWei(tokenIn, amountIn),
      formatTokenAmountInWei(tokenIn, tokenIn.reserve),
      formatTokenAmountInWei(tokenOut, tokenOut.reserve),
    ],
    refetchInterval: 2_500,
  });
  return parseFloat(formatEther(data));
};
