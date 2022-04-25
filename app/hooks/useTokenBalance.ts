import { useAccount, useBalance, useNetwork } from "wagmi";
import { utils } from "ethers";
import { Token } from "~/types";
import { useIsMounted } from "./useIsMounted";

export function useTokenBalance(token: Token) {
  const isMounted = useIsMounted();
  const { data: accountData } = useAccount();
  const { activeChain } = useNetwork();
  const tokenAddress = activeChain
    ? token.addresses[activeChain.id]
    : undefined;
  const { data: balanceData } = useBalance({
    addressOrName: accountData?.address,
    token: token.symbol === "ETH" ? undefined : tokenAddress,
    watch: true,
    enabled: isMounted && !!accountData?.address && !!tokenAddress,
  });

  return parseFloat(utils.formatEther(balanceData?.value ?? 0));
}
