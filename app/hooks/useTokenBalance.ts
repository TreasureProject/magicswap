import { useBalance } from "wagmi";
import { utils } from "ethers";
import type { Token } from "~/types";
import { useUser } from "~/context/userContext";

export const useAddressBalance = (address?: string) => {
  const { address: userAddress, isConnected } = useUser();
  const { data: balanceData, refetch } = useBalance({
    addressOrName: userAddress,
    token: address,
    enabled: isConnected,
    staleTime: 2_000,
  });

  return {
    value: parseFloat(utils.formatEther(balanceData?.value ?? 0)),
    refetch,
  };
};

export const useTokenBalance = (token: Token) =>
  useAddressBalance(token.isEth ? undefined : token.id);
