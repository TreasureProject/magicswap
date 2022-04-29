import { useContractWrite } from "wagmi";

import UniswapV2Router02Abi from "../../artifacts/UniswapV2Router02.json";

const contractConfig = {
  addressOrName: "0x0a073b830cd4247d518c4f0d1bafd6edf7af507b",
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

export const useV2RouterWrite = (functionName: FunctionName) =>
  useContractWrite(contractConfig, functionName);
