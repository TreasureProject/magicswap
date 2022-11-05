import { chainId, useNetwork } from "wagmi";

export const useChainId = () => {
  const { chain } = useNetwork();
  return chain?.id ?? chainId.arbitrum;
};
