import { useAccount, useBalance } from "wagmi";
import { utils } from "ethers";
import type { Token } from "~/types";
import { useIsMounted } from "./useIsMounted";

export const useAddressBalance = (address?: string) => {
  const isMounted = useIsMounted();
  const { data: accountData } = useAccount();
  const { data: balanceData } = useBalance({
    addressOrName: accountData?.address,
    token: address,
    watch: true,
    enabled: isMounted && !!accountData?.address,
  });

  return parseFloat(utils.formatEther(balanceData?.value ?? 0));
};

export const useTokenBalance = (token: Token) =>
  useAddressBalance(token.symbol === "WETH" ? undefined : token.id);
