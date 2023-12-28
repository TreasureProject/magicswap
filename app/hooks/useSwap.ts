import { uniswapV2Router02ABI } from "artifacts/uniswapV2Router02ABI";
import { useEffect } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { useContractAddresses } from "./useContractAddresses";
import { useSettings } from "~/context/settingsContext";
import { useUser } from "~/context/userContext";
import type { AddressString } from "~/types";
import { calculateAmountInMin, calculateAmountOutMin } from "~/utils/swap";

type Props = {
  path: AddressString[];
  amountIn: bigint;
  amountOut: bigint;
  isExactOut?: boolean;
  enabled?: boolean;
  onSuccess?: () => void;
};

export const useSwap = ({
  path,
  amountIn: rawAmountIn,
  amountOut: rawAmountOut,
  isExactOut,
  enabled = true,
  onSuccess,
}: Props) => {
  const { address } = useUser();
  const { slippage, deadline } = useSettings();
  const contractAddress = useContractAddresses().Router;

  const amountIn = isExactOut
    ? calculateAmountInMin(rawAmountIn, slippage)
    : rawAmountIn;
  const amountOut = isExactOut
    ? rawAmountOut
    : calculateAmountOutMin(rawAmountOut, slippage);
  const transactionDeadline = BigInt(
    Math.ceil(Date.now() / 1000) + 60 * deadline,
  );
  const isEnabled =
    enabled && !!address && (isExactOut ? amountOut > 0 : amountIn > 0);

  const { config: exactOutConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: uniswapV2Router02ABI,
    functionName: "swapTokensForExactTokens",
    args: [
      amountOut, // amountOut
      amountIn, // amountInMax
      path,
      address as AddressString,
      transactionDeadline,
    ],
    enabled: isEnabled && isExactOut,
  });
  const swapTokensForExactTokens = useContractWrite(exactOutConfig);
  const { isLoading: isWaitingExactOut, isSuccess: isSuccessExactOut } =
    useWaitForTransaction(swapTokensForExactTokens.data);

  const { config: exactInConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: uniswapV2Router02ABI,
    functionName: "swapExactTokensForTokens",
    args: [
      amountIn, // amountIn
      amountOut, // amountOutMin
      path,
      address as AddressString,
      transactionDeadline,
    ],
    enabled: isEnabled && !isExactOut,
  });
  const swapExactTokensForTokens = useContractWrite(exactInConfig);
  const { isLoading: isWaitingExactIn, isSuccess: isSuccessExactIn } =
    useWaitForTransaction(swapExactTokensForTokens.data);

  useEffect(() => {
    if (isExactOut) {
      if (isSuccessExactOut) {
        onSuccess?.();
      }
    } else if (isSuccessExactIn) {
      onSuccess?.();
    }
  }, [isExactOut, isSuccessExactOut, isSuccessExactIn, onSuccess]);

  return {
    amountIn,
    amountOut,
    slippage,
    swap: isExactOut
      ? swapTokensForExactTokens.write
      : swapExactTokensForTokens.write,
    isLoading: isExactOut
      ? swapTokensForExactTokens.isLoading || isWaitingExactOut
      : swapExactTokensForTokens.isLoading || isWaitingExactIn,
  };
};
