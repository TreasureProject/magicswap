import { getEnvVariable } from "~/utils/env";
import UniswapV2Router02Abi from "../../artifacts/UniswapV2Router02.json";
import { useContractWrite } from "./useContractWrite";

const contractConfig = {
  addressOrName: getEnvVariable("UNISWAP_V2_ROUTER_ADDRESS"),
  contractInterface: UniswapV2Router02Abi,
};

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
) => useContractWrite(statusHeader, { ...contractConfig, functionName });
