import type { AppContract } from "../const";
import { CONTRACT_ADDRESSES } from "../const";
import { useChainId } from "./useChainId";

export const useContractAddress = (contract: AppContract) => {
  const chainId = useChainId();
  return CONTRACT_ADDRESSES[chainId][contract];
};
