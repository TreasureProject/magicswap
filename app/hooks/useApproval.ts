import { AddressZero, MaxUint256, Zero } from "@ethersproject/constants";
import { erc20ABI, useContractRead } from "wagmi";
import type { AddressString, Pair, Token } from "~/types";
import { useContractWrite } from "./useContractWrite";
import { useUser } from "~/context/userContext";
import { useContractAddress } from "./useContractAddress";
import { AppContract } from "~/const";
import type { BigNumber } from "@ethersproject/bignumber";

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

export const usePairApproval = (pair: Pair) =>
  useErc20Approval(pair.id, `${pair.name} LP Token`);

export const useTokenApproval = (token: Token, minAmount?: BigNumber) =>
  useErc20Approval(token.id, token.symbol, minAmount);
