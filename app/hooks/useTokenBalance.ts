import { useBalance } from "wagmi";
import { utils } from "ethers";
import type { Token } from "~/types";
import { useIsMounted } from "./useIsMounted";
import { useUser } from "~/context/userContext";

export const useAddressBalance = (address?: string) => {
  const isMounted = useIsMounted();
  const { accountData } = useUser();
  const { data: balanceData } = useBalance({
    addressOrName: accountData?.address,
    token: address,
    enabled: isMounted && !!accountData?.address,
    staleTime: 2_000,
  });

  return parseFloat(utils.formatEther(balanceData?.value ?? 0));
};

export const useTokenBalance = (token: Token) =>
  useAddressBalance(token.symbol === "WETH" ? undefined : token.id);
