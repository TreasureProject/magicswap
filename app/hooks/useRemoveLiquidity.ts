import { uniswapV2Router02ABI } from "artifacts/uniswapV2Router02ABI";
import { useEffect } from "react";
import type { TransactionReceipt } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { useContractAddresses } from "./useContractAddresses";
import { useSettings } from "~/context/settingsContext";
import { useUser } from "~/context/userContext";
import type { AddressString, Pair } from "~/types";
import { calculateAmountOutMin } from "~/utils/swap";

type Props = {
  pair: Pair;
  amount: bigint;
  token0Amount: bigint;
  token1Amount: bigint;
  onSuccess?: (txReceipt: TransactionReceipt | undefined) => void;
};

export const useRemoveLiquidity = ({
  pair,
  amount,
  token0Amount,
  token1Amount,
  onSuccess,
}: Props) => {
  const { address } = useUser();
  const { slippage, deadline } = useSettings();

  const token0AmountMin = calculateAmountOutMin(token0Amount, slippage);
  const token1AmountMin = calculateAmountOutMin(token1Amount, slippage);
  const transactionDeadline = BigInt(
    Math.ceil(Date.now() / 1000) + 60 * deadline,
  );

  const { config } = usePrepareContractWrite({
    address: useContractAddresses().Router,
    abi: uniswapV2Router02ABI,
    functionName: "removeLiquidity",
    args: [
      pair.token0.id,
      pair.token1.id,
      amount,
      token0AmountMin,
      token1AmountMin,
      address as AddressString,
      transactionDeadline,
    ],
    enabled: !!address && amount > 0,
  });

  const { data, write: removeLiquidity, isLoading } = useContractWrite(config);
  const {
    data: txReceipt,
    isLoading: isWaiting,
    isSuccess,
  } = useWaitForTransaction(data);

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.(txReceipt);
    }
  }, [isSuccess, onSuccess, txReceipt]);

  return {
    removeLiquidity,
    isLoading: isLoading || isWaiting,
  };
};
