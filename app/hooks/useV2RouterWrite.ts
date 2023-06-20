import UniswapV2Router02Abi from "../../artifacts/UniswapV2Router02.json";
import { useContractAddress } from "./useContractAddress";
import { useContractWrite } from "./useContractWrite";
import { AppContract } from "~/const";

export type RouterFunctionName =
  | "addLiquidity"
  | "addLiquidityETH"
  | "removeLiquidity"
  | "removeLiquidityETH"
  | "swapETHForExactTokens"
  | "swapExactETHForTokens"
  | "swapExactTokensForETH"
  | "swapTokensForExactETH"
  | "swapExactTokensForTokens"
  | "swapTokensForExactTokens";

export const useV2RouterWrite = (
  functionName: RouterFunctionName,
  statusHeader?: string
) => {
  const contractAddress = useContractAddress(AppContract.Router);
  return useContractWrite(statusHeader, {
    address: contractAddress,
    abi: UniswapV2Router02Abi,
    mode: "recklesslyUnprepared",
    functionName,
  });
};
