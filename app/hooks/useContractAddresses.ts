import { arbitrum } from "viem/chains";
import { useChainId } from "wagmi";

import { CONTRACT_ADDRESSES } from "~/const";
import type { SupportedChainId } from "~/types";

export const useContractAddresses = () => {
  const chainId = useChainId();
  return chainId in CONTRACT_ADDRESSES
    ? CONTRACT_ADDRESSES[chainId as SupportedChainId]
    : CONTRACT_ADDRESSES[arbitrum.id];
};
