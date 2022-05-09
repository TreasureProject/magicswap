import { utils } from "ethers";
import { MaxUint256 } from "@ethersproject/constants";
import { erc20ABI, useContractRead } from "wagmi";
import type { Pair, Token } from "~/types";
import { useContractWrite } from "./useContractWrite";
import { getEnvVariable } from "~/utils/env";
import { useUser } from "~/context/userContext";

const useErc20Approval = (tokenId: string, tokenSymbol: string) => {
  const contractConfig = {
    addressOrName: tokenId,
    contractInterface: erc20ABI,
  };

  const { accountData } = useUser();
  const { data: allowance } = useContractRead(contractConfig, "allowance", {
    args: [accountData?.address, getEnvVariable("UNISWAP_V2_ROUTER_ADDRESS")],
    enabled: !!accountData?.address,
  });

  const { write: writeApprove, isLoading } = useContractWrite(
    `Approve ${tokenSymbol}`,
    contractConfig,
    "approve"
  );
  return {
    isLoading,
    isApproved: allowance
      ? parseFloat(utils.formatEther(allowance)) > 0
      : false,
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
