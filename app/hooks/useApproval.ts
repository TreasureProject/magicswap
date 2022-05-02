import { utils } from "ethers";
import { MaxUint256 } from "@ethersproject/constants";
import { erc20ABI, useContractRead } from "wagmi";
import type { Token } from "~/types";
import { useContractWrite } from "./useContractWrite";
import { getEnvVariable } from "~/utils/env";
import { useUser } from "~/context/userContext";

export const useApproval = (token: Token) => {
  const contractConfig = {
    addressOrName: token.id,
    contractInterface: erc20ABI,
  };

  const { accountData } = useUser();
  const { data: allowance } = useContractRead(contractConfig, "allowance", {
    args: [accountData?.address, getEnvVariable("UNISWAP_V2_ROUTER_ADDRESS")],
    enabled: !!accountData?.address,
  });

  const { write: writeApprove } = useContractWrite(contractConfig, "approve");
  return {
    isApproved: allowance
      ? parseFloat(utils.formatEther(allowance)) >= 0
      : false,
    approve: () =>
      writeApprove(
        {
          args: [
            getEnvVariable("UNISWAP_V2_ROUTER_ADDRESS"),
            MaxUint256.toString(),
          ],
        },
        `Approve ${token.symbol}`
      ),
  };
};
