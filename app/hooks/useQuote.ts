import { formatEther } from "ethers/lib/utils";
import { AppContract, REFETCH_INTERVAL_HIGH_PRIORITY } from "~/const";
import type { PairToken } from "~/types";
import { formatTokenAmountInWei } from "~/utils/number";
import UniswapV2Router02Abi from "../../artifacts/UniswapV2Router02.json";
import { useContractAddress } from "./useContractAddress";
import { useContractRead } from "./useContractRead";

export const useQuote = (
  tokenIn: PairToken,
  tokenOut: PairToken,
  amountIn: number
) => {
  const contractAddress = useContractAddress(AppContract.Router);
  const { data = "0" } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: UniswapV2Router02Abi,
    functionName: "quote",
    enabled: amountIn > 0,
    args: [
      formatTokenAmountInWei(tokenIn, amountIn),
      formatTokenAmountInWei(tokenIn, tokenIn.reserve),
      formatTokenAmountInWei(tokenOut, tokenOut.reserve),
    ],
    refetchInterval: REFETCH_INTERVAL_HIGH_PRIORITY,
  });
  return parseFloat(formatEther(data));
};
