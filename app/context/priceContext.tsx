import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useQuery } from "wagmi";
import { fetchMagicPrice } from "~/utils/price";

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
  const { data: magicUsd = 0 } = useQuery(
    ["price:magic-usd"],
    fetchMagicPrice,
    {
      refetchInterval: 2_500,
      select: (data) => data.magicUsd,
    }
  );

  return <Context.Provider value={{ magicUsd }}>{children}</Context.Provider>;
};
