import { truncateEthAddress } from "~/utils/address";
import { useUser } from "~/context/userContext";
import { WalletIcon } from "./Icons";

export function Wallet() {
  const {
    openWalletModal,
    isConnected,
    isConnecting,
    accountData,
    disconnect,
  } = useUser();

  return (
    <>
      <div
        className="flex cursor-pointer items-center justify-center gap-2 text-sm font-semibold text-gray-500 sm:text-base"
        onClick={() => {
          isConnected ? disconnect() : openWalletModal();
        }}
      >
        {isConnected && accountData ? (
          truncateEthAddress(accountData.address ?? "")
        ) : (
          <>
            <WalletIcon className="h-5 w-5" />
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </>
        )}
      </div>
    </>
  );
}
