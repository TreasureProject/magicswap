import { useAccount, useBalance } from "wagmi";
import { utils } from "ethers";
import { Token } from "~/types";
import { useIsMounted } from "./useIsMounted";

export function useTokenBalance(token: Token) {
  const isMounted = useIsMounted();
  const { data: accountData } = useAccount();
  const { data: balanceData } = useBalance({
    addressOrName: accountData?.address,
    token: token.symbol === "WETH" ? undefined : token.id,
    watch: true,
    enabled: isMounted && !!accountData?.address,
  });

  return parseFloat(utils.formatEther(balanceData?.value ?? 0));
}
