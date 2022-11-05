import { formatEther } from "ethers/lib/utils";
import { useContractRead } from "wagmi";
import { AppContract } from "~/const";
import type { PairToken } from "~/types";
import { formatTokenAmountInWei } from "~/utils/number";
import UniswapV2Router02Abi from "../../artifacts/UniswapV2Router02.json";
import { useContractAddress } from "./useContractAddress";

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
    watch: true,
  });
  return parseFloat(formatEther(data));
};
