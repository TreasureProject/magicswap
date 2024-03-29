import { uniswapV2PairABI } from "artifacts/uniswapV2PairABI";
import { formatUnits } from "viem";
import { useContractRead } from "wagmi";

import { useInterval } from "./useInterval";
import { REFETCH_INTERVAL_HIGH_PRIORITY } from "~/const";
import type { AddressString, Pair } from "~/types";

// Fetches pair reserve values directly from contract
const usePairReserves = (
  id: AddressString,
  token0Decimals = 18,
  token1Decimals = 18,
) => {
  const { data: pairData, refetch } = useContractRead({
    address: id,
    abi: uniswapV2PairABI,
    functionName: "getReserves",
  });

  useInterval(refetch, REFETCH_INTERVAL_HIGH_PRIORITY);

  const reserves = {
    id,
    reserve0: 0,
    reserve1: 0,
  };

  if (pairData) {
    const [rawReserve0, rawReserve1] = pairData;
    reserves.reserve0 = parseFloat(formatUnits(rawReserve0, token0Decimals));
    reserves.reserve1 = parseFloat(formatUnits(rawReserve1, token1Decimals));
  }

  return reserves;
};

// Overrides subgraph data with latest from pair contract
export const usePair = (pair: Pair) => {
  // const { magicUsd } = usePrice();
  const { reserve0, reserve1 } = usePairReserves(
    pair.id,
    pair.token0.decimals,
    pair.token1.decimals,
  );

  const nextPair = { ...pair };
  nextPair.token0.reserve = reserve0;
  nextPair.token1.reserve = reserve1;
  nextPair.token0.price =
    reserve0 > 0 && reserve1 > 0 ? reserve0 / reserve1 : 0;
  nextPair.token1.price =
    reserve0 > 0 && reserve1 > 0 ? reserve1 / reserve0 : 0;
  // nextPair.token0.priceUsd =
  //   (nextPair.token0.isMagic ? 1 : nextPair.token1.price) * magicUsd;
  // nextPair.token1.priceUsd =
  //   (nextPair.token1.isMagic ? 1 : nextPair.token0.price) * magicUsd;
  return nextPair;
};
