import { MaxUint256, Zero } from "@ethersproject/constants";
import { erc20ABI, useContractRead } from "wagmi";
import type { Pair, Token } from "~/types";
import { useContractWrite } from "./useContractWrite";
import { useUser } from "~/context/userContext";
import { useContractAddress } from "./useContractAddress";
import { AppContract } from "~/const";
import type { BigNumber } from "ethers";

const useErc20Approval = (
  tokenId: string,
  tokenSymbol: string,
  minAmount?: BigNumber
) => {
  const contractAddress = useContractAddress(AppContract.Router);
  const { address } = useUser();
  const { data = Zero, refetch } = useContractRead({
    addressOrName: tokenId,
    contractInterface: erc20ABI,
    functionName: "allowance",
    args: [address, contractAddress],
    enabled: !!address,
  });

  const {
    write: writeApprove,
    isLoading,
    isSuccess,
  } = useContractWrite(`Approve ${tokenSymbol}`, {
    addressOrName: tokenId,
    contractInterface: erc20ABI,
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
