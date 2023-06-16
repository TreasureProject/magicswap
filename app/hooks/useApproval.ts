import type { BigNumber } from "@ethersproject/bignumber";
import { AddressZero, MaxUint256, Zero } from "@ethersproject/constants";
import { erc20ABI, useContractRead } from "wagmi";

import { useContractAddress } from "./useContractAddress";
import { useContractWrite } from "./useContractWrite";
import { AppContract } from "~/const";
import { useUser } from "~/context/userContext";
import type { AddressString, Pair, Token } from "~/types";

const useErc20Approval = (
  tokenId: AddressString,
  tokenSymbol: string,
  minAmount?: BigNumber
) => {
  const contractAddress = useContractAddress(AppContract.Router);
  const { address } = useUser();
  const { data = Zero, refetch } = useContractRead({
    address: tokenId,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address ?? AddressZero, contractAddress],
    enabled: !!address,
  });

  const {
    write: writeApprove,
    isLoading,
    isSuccess,
  } = useContractWrite(`Approve ${tokenSymbol}`, {
    address: tokenId,
    abi: erc20ABI,
    mode: "recklesslyUnprepared",
    functionName: "approve",
  });

  return {
    refetch,
    isLoading,
    isSuccess,
    isApproved: minAmount ? data.gte(minAmount) : data.gt(Zero),
    approve: () =>
      writeApprove?.({
        recklesslySetUnpreparedArgs: [contractAddress, MaxUint256.toString()],
      }),
  };
};

export const usePairApproval = (pair: Pair, minAmount?: BigNumber) =>
  useErc20Approval(pair.id, `${pair.name} LP Token`, minAmount);

export const useTokenApproval = (token: Token, minAmount?: BigNumber) =>
  useErc20Approval(token.id, token.symbol, minAmount);
