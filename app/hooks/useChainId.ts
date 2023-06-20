import { useNetwork } from "wagmi";
import { arbitrum } from "wagmi/chains";

export const useChainId = () => {
  const { chain } = useNetwork();
  if (!chain) {
    return arbitrum.id;
  }

  return chain.unsupported ? arbitrum.id : chain.id;
};
