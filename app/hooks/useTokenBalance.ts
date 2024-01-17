import { Zero } from "@ethersproject/constants";
import { useBalance } from "wagmi";

import { useUser } from "~/context/userContext";
import type { AddressString, Token } from "~/types";

export const useAddressBalance = (address?: AddressString) => {
  const { address: userAddress, isConnected } = useUser();
  const { data: balanceData, refetch } = useBalance({
    address: userAddress,
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
