import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { GlobeAltIcon } from "@heroicons/react/outline";

import { useIsMounted } from "~/hooks";
import { truncateEthAddress } from "~/utils/address";

export function Wallet() {
  const isMounted = useIsMounted();
  const { connect, connectors, isConnecting: rawIsConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: accountData } = useAccount();
  const { data: ensNameData } = useEnsName({ address: accountData?.address });

  const isConnected = isMounted && accountData;
  const isConnecting = isMounted && rawIsConnecting;

  const handleConnect = () => {
    if (isConnecting || isConnected) {
      disconnect();
      return;
    }

    connect(connectors[0]);
  };

  return (
    <div
      className="flex cursor-pointer items-center justify-center gap-2 font-semibold text-gray-500"
      onClick={handleConnect}
    >
      {isConnected ? (
        <>{ensNameData ?? truncateEthAddress(accountData.address ?? "")}</>
      ) : (
        <>
          <GlobeAltIcon className="h-5 w-5" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </>
      )}
    </div>
  );
}
