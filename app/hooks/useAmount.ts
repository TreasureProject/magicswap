import type { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";

import UniswapV2Router02Abi from "../../artifacts/UniswapV2Router02.json";
import { useContractAddress } from "./useContractAddress";
import { useContractRead } from "./useContractRead";
import { AppContract, REFETCH_INTERVAL_HIGH_PRIORITY } from "~/const";
import type { PairToken } from "~/types";
import { toBigNumber } from "~/utils/number";

export const useAmount = (
  tokenIn: PairToken,
  tokenOut: PairToken,
  value: BigNumber,
  isExactOut: boolean,
) => {
  const contractAddress = useContractAddress(AppContract.Router);
  const { data = Zero } = useContractRead({
    address: contractAddress,
    abi: UniswapV2Router02Abi,
    functionName: isExactOut ? "getAmountIn" : "getAmountOut",
    enabled: value.gt(Zero),
    args: [
      value,
      toBigNumber(tokenIn.reserve, tokenIn.decimals),
      toBigNumber(tokenOut.reserve, tokenOut.decimals),
    ],
    refetchInterval: REFETCH_INTERVAL_HIGH_PRIORITY,
  });
  const result = data as BigNumber;
  return {
    in: isExactOut ? result : value,
    out: isExactOut ? value : result,
  };
};
