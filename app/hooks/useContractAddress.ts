import { useChainId } from "./useChainId";
import type { AppContract } from "../const";
import { CONTRACT_ADDRESSES } from "../const";

export const useContractAddress = (contract: AppContract) => {
  const chainId = useChainId();
  return CONTRACT_ADDRESSES[chainId][contract];
};
