import { AppContract } from "~/const";
import UniswapV2Router02Abi from "../../artifacts/UniswapV2Router02.json";
import { useContractAddress } from "./useContractAddress";
import { useContractWrite } from "./useContractWrite";

type FunctionName =
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
  functionName: FunctionName,
  statusHeader?: string
) => {
  const contractAddress = useContractAddress(AppContract.Router);
  return useContractWrite(statusHeader, {
    addressOrName: contractAddress,
    contractInterface: UniswapV2Router02Abi,
    mode: "recklesslyUnprepared",
    functionName,
  });
};
