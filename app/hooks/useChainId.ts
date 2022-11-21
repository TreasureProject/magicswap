import { chainId, useNetwork } from "wagmi";

export const useChainId = () => {
  const { chain } = useNetwork();
  if (!chain) {
    return chainId.arbitrum;
  }

  return chain.unsupported ? chainId.arbitrum : chain.id;
};
