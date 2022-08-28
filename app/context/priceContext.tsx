import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useQuery } from "wagmi";
import { ARBITRUM_MAGIC_ADDRESS, fetchMagicPrice } from "~/utils/price";

const Context = createContext<{
  magicUsd: number;
} | null>(null);

export const usePrice = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Must call `usePrice` within a `PriceProvider` component.");
  }

  return context;
};

export const PriceProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useQuery<
    unknown,
    unknown,
    Record<string, number> | undefined,
    string[]
  >(["price:magic-usd"], fetchMagicPrice, {
    refetchInterval: 2_500,
  });

  return (
    <Context.Provider value={{ magicUsd: data?.[ARBITRUM_MAGIC_ADDRESS] ?? 0 }}>
      {children}
    </Context.Provider>
  );
};
