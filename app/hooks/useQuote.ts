import { formatEther } from "ethers/lib/utils";
import { useContractRead } from "wagmi";
import type { PairToken } from "~/types";
import { getEnvVariable } from "~/utils/env";
import { formatTokenAmountInWei } from "~/utils/number";
import UniswapV2Router02Abi from "../../artifacts/UniswapV2Router02.json";

export const useQuote = (
  tokenIn: PairToken,
  tokenOut: PairToken,
  amountIn: number
) => {
  const { data = "0" } = useContractRead({
    addressOrName: getEnvVariable("UNISWAP_V2_ROUTER_ADDRESS"),
    contractInterface: UniswapV2Router02Abi,
    functionName: "quote",
    enabled: amountIn > 0,
    args: [
      formatTokenAmountInWei(tokenIn, amountIn),
      formatTokenAmountInWei(tokenIn, tokenIn.reserve),
      formatTokenAmountInWei(tokenOut, tokenOut.reserve),
    ],
    watch: true,
  });
  return parseFloat(formatEther(data));
};
