import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

import { useBlockExplorer } from "~/hooks/useBlockExplorer";

type Props = {
  txHash?: string;
};

export const TransactionLink = ({ txHash }: Props) => {
  const blockExplorer = useBlockExplorer();
  return txHash ? (
    <a
      href={`${blockExplorer.url}/tx/${txHash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1"
    >
      View on {blockExplorer.name}{" "}
      <ArrowTopRightOnSquareIcon className="h-3 w-3" />
    </a>
  ) : null;
};
