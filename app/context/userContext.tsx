import React, { createContext, useContext } from "react";
import { useAccount, useNetwork } from "wagmi";
import { useIsMounted } from "~/hooks";
import type { Optional } from "~/types";

const Context = createContext<{
  isConnected: boolean;
  address: Optional<string>;
  unsupported: boolean;
} | null>(null);

export const useUser = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Must call `useUser` within a `UserProvider` component.");
  }

  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const isMounted = useIsMounted();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  return (
    <Context.Provider
      value={{
        isConnected: isMounted && isConnected && !!address,
        unsupported: chain?.unsupported ?? true,
        address,
      }}
    >
      {children}
    </Context.Provider>
  );
};
