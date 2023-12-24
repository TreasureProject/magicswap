import { uniswapV2Router02ABI } from "artifacts/uniswapV2Router02ABI";
import { useCallback } from "react";
import { useContractRead } from "wagmi";

import { useContractAddresses } from "./useContractAddresses";
import { useInterval } from "./useInterval";
import { REFETCH_INTERVAL_HIGH_PRIORITY } from "~/const";
import type { PairToken } from "~/types";
import { toBigInt } from "~/utils/number";

export const useAmount = (
  tokenIn: PairToken,
  tokenOut: PairToken,
  value: bigint,
  isExactOut: boolean,
) => {
  const enabled = value > 0;
  const { data = 0n, refetch } = useContractRead({
    address: useContractAddresses().Router,
    abi: uniswapV2Router02ABI,
    functionName: isExactOut ? "getAmountIn" : "getAmountOut",
    args: [
      value,
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
    in: isExactOut ? data : value,
    out: isExactOut ? value : data,
  };
};
