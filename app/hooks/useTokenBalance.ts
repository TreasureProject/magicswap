import { useBalance } from "wagmi";
import { utils } from "ethers";
import type { Token } from "~/types";
import { useIsMounted } from "./useIsMounted";
import { useUser } from "~/context/userContext";

export const useAddressBalance = (address?: string) => {
  const isMounted = useIsMounted();
  const { accountData } = useUser();
  const { data: balanceData, refetch } = useBalance({
    addressOrName: accountData?.address,
    token: address,
    enabled: isMounted && !!accountData?.address,
    staleTime: 2_000,
  });

  return {
    value: parseFloat(utils.formatEther(balanceData?.value ?? 0)),
    refetch,
  };
};

export const useTokenBalance = (token: Token) =>
  useAddressBalance(token.isEth ? undefined : token.id);
