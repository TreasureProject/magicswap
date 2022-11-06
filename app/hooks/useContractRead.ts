import {
  useContractRead as wagmiUseContractRead,
  useContractReads as wagmiUseContractReads,
} from "wagmi";

import { useInterval } from "./useInterval";

type UseContractReadParams = Parameters<typeof wagmiUseContractRead>[0] & {
  refetchInterval?: number;
};

type UseContractReadsParams = Parameters<typeof wagmiUseContractReads>[0] & {
  refetchInterval?: number;
};

export const useContractRead = (params: UseContractReadParams) => {
  const { refetchInterval, ...wagmiParams } = params;
  const response = wagmiUseContractRead(wagmiParams);
  useInterval(response.refetch, refetchInterval);
  return response;
};

export const useContractReads = (params: UseContractReadsParams) => {
  const { refetchInterval, ...wagmiParams } = params;
  const response = wagmiUseContractReads(wagmiParams);
  useInterval(response.refetch, refetchInterval);
  return response;
};
