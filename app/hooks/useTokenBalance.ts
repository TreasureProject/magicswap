import { useBalance } from "wagmi";
import type { Token } from "~/types";
import { useUser } from "~/context/userContext";
import { formatEther } from "ethers/lib/utils";

export const useAddressBalance = (address?: string) => {
  const { address: userAddress, isConnected } = useUser();
  const { data: balanceData, refetch } = useBalance({
    addressOrName: userAddress,
    token: address,
    enabled: isConnected,
    staleTime: 2_000,
  });

  return {
    value: parseFloat(formatEther(balanceData?.value ?? 0)),
    refetch,
  };
};

export const useTokenBalance = (token: Token) =>
  useAddressBalance(token.isEth ? undefined : token.id);
