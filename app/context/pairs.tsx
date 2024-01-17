import { uniswapV2PairABI } from "artifacts/uniswapV2PairABI";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { formatUnits } from "viem";
import { useContractReads } from "wagmi";

import { REFETCH_INTERVAL_HIGH_PRIORITY } from "~/const";
import { useInterval } from "~/hooks/useInterval";
import { useIsMounted } from "~/hooks/useIsMounted";
import type { Pair, Token } from "~/types";
import { getUniqueTokens } from "~/utils/tokens";

const Context = createContext<{
  pairs: Pair[];
  tokens: Token[];
} | null>(null);

export const usePairs = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Must call `usePairs` within a `PairsProvider` component.");
  }

  return context;
};

type Props = {
  pairs: Pair[];
  children: ReactNode;
};

export const PairsProvider = ({ pairs: rawPairs, children }: Props) => {
  const isMounted = useIsMounted();
  const { data, refetch } = useContractReads({
    contracts: rawPairs.map(({ id }) => ({
      address: id,
      abi: uniswapV2PairABI,
      functionName: "getReserves",
    })),
    enabled: isMounted,
  });
  useInterval(refetch, REFETCH_INTERVAL_HIGH_PRIORITY);

  const pairs = rawPairs.map((pair, i) => {
    const nextPair = { ...pair };
    const reserves = data?.[i]?.result as [bigint, bigint, number] | undefined;
    if (reserves) {
      const reserve0 = parseFloat(
        formatUnits(reserves[0], nextPair.token0.decimals),
      );
      const reserve1 = parseFloat(
        formatUnits(reserves[1], nextPair.token1.decimals),
      );
      nextPair.reserve0 = reserve0;
      nextPair.reserve1 = reserve1;
      nextPair.token0.reserve = reserve0;
      nextPair.token1.reserve = reserve1;
      nextPair.token0.price =
        reserve0 > 0 && reserve1 > 0 ? reserve0 / reserve1 : 0;
      nextPair.token1.price =
        reserve0 > 0 && reserve1 > 0 ? reserve1 / reserve0 : 0;
    }

    return nextPair;
  });

  const tokens = getUniqueTokens(pairs).sort((a, b) =>
    a.symbol.localeCompare(b.symbol),
  );

  return (
    <Context.Provider value={{ pairs, tokens }}>{children}</Context.Provider>
  );
};
