import type { WriteContractConfig } from "@wagmi/core";
import { useContractWrite as useContractWriteWagmi } from "wagmi";
import toast from "react-hot-toast";
import type { Optional } from "~/types";
import { useCallback } from "react";

type UseContractWriteArgs = Parameters<typeof useContractWriteWagmi>;

const renderStatusWithHeader = (message: string, headerMessage?: string) => {
  if (!headerMessage) {
    return message;
  }

  return (
    <div className="ml-1">
      <p className="truncate text-sm font-medium text-white">{headerMessage}</p>
      <p className="mt-1 text-sm text-gray-500">{message}</p>
    </div>
  );
};

export const useContractWrite = (...args: UseContractWriteArgs) => {
  const result = useContractWriteWagmi(...args);
  const { writeAsync } = result;

  const write = useCallback(
    (
      overrideConfig: Optional<WriteContractConfig> = undefined,
      statusHeader: Optional<string> = undefined,
      loadingMessage = "Transaction in progress...",
      successMessage = "Transaction successful",
      errorMessage = "Transaction failed"
    ) => {
      const promise = writeAsync(overrideConfig);
      toast.promise(
        promise,
        {
          loading: renderStatusWithHeader(loadingMessage, statusHeader),
          success: renderStatusWithHeader(successMessage, statusHeader),
          error: (err: Error) =>
            renderStatusWithHeader(
              `${errorMessage}: ${err.message}`,
              statusHeader
            ),
        },
        {
          style: {
            minWidth: "250px",
          },
        }
      );
    },
    [writeAsync]
  );

  return {
    ...result,
    write,
  };
};
