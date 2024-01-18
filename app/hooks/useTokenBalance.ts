import { useBalance } from "wagmi";

import { useUser } from "~/context/userContext";
import type { AddressString, Token } from "~/types";

export const useAddressBalance = (address?: AddressString) => {
  const { address: userAddress, isConnected } = useUser();
  const { data, refetch } = useBalance({
    address: userAddress,
    token: address,
    enabled: isConnected,
    staleTime: 2_000,
  });

  return {
    value: data?.value ?? 0n,
    refetch,
  };
};

export const useTokenBalance = (token: Token) =>
  useAddressBalance(token.isEth ? undefined : token.id);
