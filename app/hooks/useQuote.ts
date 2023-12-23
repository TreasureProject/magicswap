import type { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";

import UniswapV2Router02Abi from "../../artifacts/UniswapV2Router02.json";
import { useContractAddress } from "./useContractAddress";
import { useContractRead } from "./useContractRead";
import { AppContract, REFETCH_INTERVAL_HIGH_PRIORITY } from "~/const";
import type { PairToken } from "~/types";
import { toBigNumber } from "~/utils/number";

export const useQuote = (
  token0: PairToken,
  token1: PairToken,
  amount: BigNumber,
  isExactToken0: boolean,
) => {
  const contractAddress = useContractAddress(AppContract.Router);
  const tokenIn = isExactToken0 ? token0 : token1;
  const tokenOut = isExactToken0 ? token1 : token0;
  const { data = Zero } = useContractRead({
    address: contractAddress,
    abi: UniswapV2Router02Abi,
    functionName: "quote",
    enabled: amount.gt(Zero),
    args: [
      amount,
      toBigNumber(tokenIn.reserve, tokenIn.decimals),
      toBigNumber(tokenOut.reserve, tokenOut.decimals),
    ],
    refetchInterval: REFETCH_INTERVAL_HIGH_PRIORITY,
  });
  const result = data as BigNumber;
  return {
    token0: isExactToken0 ? amount : result,
    token1: isExactToken0 ? result : amount,
  };
};
