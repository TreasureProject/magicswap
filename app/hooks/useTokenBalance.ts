import { useBalance } from "wagmi";
import type { Token } from "~/types";
import { useUser } from "~/context/userContext";
import { Zero } from "@ethersproject/constants";

export const useAddressBalance = (address?: string) => {
  const { address: userAddress, isConnected } = useUser();
  const { data: balanceData, refetch } = useBalance({
    addressOrName: userAddress,
    token: address,
    enabled: isConnected,
    staleTime: 2_000,
  });

  return {
    value: balanceData?.value ?? Zero,
    refetch,
  };
};

export const useTokenBalance = (token: Token) =>
  useAddressBalance(token.isEth ? undefined : token.id);
