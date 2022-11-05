import { MaxUint256 } from "@ethersproject/constants";
import { erc20ABI, useContractRead } from "wagmi";
import type { Pair, Token } from "~/types";
import { useContractWrite } from "./useContractWrite";
import { useUser } from "~/context/userContext";
import { formatEther } from "ethers/lib/utils";
import { useContractAddress } from "./useContractAddress";
import { AppContract } from "~/const";

const useErc20Approval = (tokenId: string, tokenSymbol: string) => {
  const contractConfig = {
    addressOrName: tokenId,
    contractInterface: erc20ABI,
  };

  const contractAddress = useContractAddress(AppContract.Router);
  const { address } = useUser();
  const { data: allowance, refetch } = useContractRead({
    ...contractConfig,
    functionName: "allowance",
    args: [address, contractAddress],
    enabled: !!address,
  });

  const {
    write: writeApprove,
    isLoading,
    isSuccess,
  } = useContractWrite(`Approve ${tokenSymbol}`, {
    ...contractConfig,
    mode: "recklesslyUnprepared",
    functionName: "approve",
  });
  return {
    refetch,
    isLoading,
    isSuccess,
    isApproved: allowance ? parseFloat(formatEther(allowance)) > 0 : false,
    approve: () =>
      writeApprove?.({
        recklesslySetUnpreparedArgs: [contractAddress, MaxUint256.toString()],
      }),
  };
};

export const usePairApproval = (pair: Pair) =>
  useErc20Approval(pair.id, `${pair.name} LP Token`);

export const useTokenApproval = (token: Token) =>
  useErc20Approval(token.id, token.symbol);
