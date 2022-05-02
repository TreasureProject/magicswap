import { BigNumber, utils } from "ethers";
import { MaxUint256 } from "@ethersproject/constants";
import { erc20ABI, useAccount, useContractRead } from "wagmi";
import type { Token } from "~/types";
import { useContractWrite } from "./useContractWrite";

export const useApproval = (token: Token) => {
  const contractConfig = {
    addressOrName: token.id,
    contractInterface: erc20ABI,
  };

  const { data: accountData } = useAccount();
  const { data: allowance } = useContractRead(contractConfig, "allowance", {
    args: [accountData?.address, "0x0a073b830cd4247d518c4f0d1bafd6edf7af507b"],
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
            "0x0a073b830cd4247d518c4f0d1bafd6edf7af507b",
            MaxUint256.toString(),
          ],
        },
        `Approve ${token.symbol}`
      ),
  };
};
