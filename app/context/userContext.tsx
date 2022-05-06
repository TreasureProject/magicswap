import React, { createContext, useContext } from "react";
import { useAccount, useConnect } from "wagmi";
import { useIsMounted } from "~/hooks";

const Context = createContext<{
  isConnected: boolean;
  accountData: ReturnType<typeof useAccount>["data"];
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
  const { activeConnector } = useConnect();
  const { data: accountData } = useAccount();

  const isConnected = !!isMounted && !!activeConnector && !!accountData;

  return (
    <Context.Provider
      value={{
        isConnected,
        accountData,
      }}
    >
      {children}
    </Context.Provider>
  );
};
