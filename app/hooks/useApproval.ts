import { useEffect } from "react";
import { zeroAddress } from "viem";
import {
  erc20ABI,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { useContractAddresses } from "./useContractAddresses";
import { useUser } from "~/context/userContext";
import type { AddressString, Pair, PairToken, Token } from "~/types";

const useErc20Approval = ({
  tokenAddress,
  amount,
  onSuccess,
}: {
  tokenAddress: AddressString;
  amount: bigint;
  onSuccess?: () => void;
}) => {
  const operator = useContractAddresses().Router;
  const { address } = useUser();
  const { data: allowance = 0n, refetch } = useContractRead({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address ?? zeroAddress, operator],
    enabled: !!address,
  });

  const isApproved = allowance >= amount;
  const { config } = usePrepareContractWrite({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: "approve",
    args: [operator, amount],
    enabled: !isApproved,
  });

  const { data, write: approve, isLoading } = useContractWrite(config);
  const { isLoading: isWaiting, isSuccess } = useWaitForTransaction(data);

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.();
    }
  }, [isSuccess, onSuccess]);

  return {
    refetch,
    isLoading: isLoading || isWaiting,
    isApproved,
    approve,
  };
};

export const usePairApproval = ({
  pair,
  amount,
  onSuccess,
}: {
  pair: Pair;
  amount: bigint;
  onSuccess?: () => void;
}) =>
  useErc20Approval({
    tokenAddress: pair.id,
    amount,
    onSuccess,
  });

export const useTokenApproval = ({
  token,
  amount,
  onSuccess,
}: {
  token: Token | PairToken;
  amount: bigint;
  onSuccess?: () => void;
}) => useErc20Approval({ tokenAddress: token?.id, amount, onSuccess });
