import { uniswapV2Router02ABI } from "artifacts/uniswapV2Router02ABI";
import { useCallback } from "react";
import { useContractRead } from "wagmi";

import { useContractAddresses } from "./useContractAddresses";
import { useInterval } from "./useInterval";
import { REFETCH_INTERVAL_HIGH_PRIORITY } from "~/const";
import type { PairToken } from "~/types";
import { toBigInt } from "~/utils/number";

export const useQuote = (
  token0: PairToken,
  token1: PairToken,
  amount: bigint,
  isExactToken0: boolean,
) => {
  const enabled = amount > 0;
  const tokenIn = isExactToken0 ? token0 : token1;
  const tokenOut = isExactToken0 ? token1 : token0;
  const { data = 0n, refetch } = useContractRead({
    address: useContractAddresses().Router,
    abi: uniswapV2Router02ABI,
    functionName: "quote",
    args: [
      amount,
      toBigInt(tokenIn.reserve, tokenIn.decimals),
      toBigInt(tokenOut.reserve, tokenOut.decimals),
    ],
    enabled,
  });
  useInterval(
    useCallback(() => {
      if (enabled) {
        refetch();
      }
    }, [refetch, enabled]),
    REFETCH_INTERVAL_HIGH_PRIORITY,
  );
  return {
    token0: isExactToken0 ? amount : data,
    token1: isExactToken0 ? data : amount,
  };
};
