import { MaxUint256 } from "@ethersproject/constants";
import { erc20ABI, useContractRead } from "wagmi";
import type { Pair, Token } from "~/types";
import { useContractWrite } from "./useContractWrite";
import { getEnvVariable } from "~/utils/env";
import { useUser } from "~/context/userContext";
import { formatEther } from "ethers/lib/utils";

const useErc20Approval = (tokenId: string, tokenSymbol: string) => {
  const contractConfig = {
    addressOrName: tokenId,
    contractInterface: erc20ABI,
  };

  const { address } = useUser();
  const { data: allowance, refetch } = useContractRead({
    ...contractConfig,
    functionName: "allowance",
    args: [address, getEnvVariable("UNISWAP_V2_ROUTER_ADDRESS")],
    enabled: !!address,
  });

  const {
    write: writeApprove,
    isLoading,
    isSuccess,
  } = useContractWrite(`Approve ${tokenSymbol}`, {
    ...contractConfig,
    functionName: "approve",
  });
  return {
    refetch,
    isLoading,
    isSuccess,
    isApproved: allowance ? parseFloat(formatEther(allowance)) > 0 : false,
    approve: () =>
      writeApprove({
        args: [
          getEnvVariable("UNISWAP_V2_ROUTER_ADDRESS"),
          MaxUint256.toString(),
        ],
      }),
  };
};

export const usePairApproval = (pair: Pair) =>
  useErc20Approval(pair.id, `${pair.name} LP Token`);

export const useTokenApproval = (token: Token) =>
  useErc20Approval(token.id, token.symbol);
