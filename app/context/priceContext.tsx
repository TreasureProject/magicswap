import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { sushiswapExchangeSdk } from "~/utils/api";

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

type Props = PropsWithChildren<{
  endpointUrl: string;
}>;

export const PriceProvider = ({ endpointUrl, children }: Props) => {
  const [magicUsd, setMagicUsd] = useState(0);

  useEffect(() => {
    const client = sushiswapExchangeSdk(endpointUrl);

    const fetchPrice = async () => {
      const { bundle, token } = await client.getMagicPrice();
      setMagicUsd((bundle?.ethPrice ?? 0) * (token?.derivedETH ?? 0));
    };

    const interval = setInterval(fetchPrice, 2000);
    fetchPrice();

    return () => clearInterval(interval);
  }, [endpointUrl]);

  return <Context.Provider value={{ magicUsd }}>{children}</Context.Provider>;
};
