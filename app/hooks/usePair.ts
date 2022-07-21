import { utils } from "ethers";
import { useContractRead } from "wagmi";
import { usePrice } from "~/context/priceContext";
import type { Pair } from "~/types";
import UniswapV2PairAbi from "../../artifacts/UniswapV2Pair.json";

// Fetches pair reserve values directly from contract
const usePairReserves = (
  id: string,
  token0Decimals = 18,
  token1Decimals = 18
) => {
  const { data: pairData } = useContractRead({
    addressOrName: id,
    contractInterface: UniswapV2PairAbi,
    functionName: "getReserves",
  });

  const reserves = {
    id,
    reserve0: 0,
    reserve1: 0,
  };

  if (pairData) {
    const [rawReserve0, rawReserve1] = pairData;
    reserves.reserve0 = parseFloat(
      utils.formatUnits(rawReserve0, token0Decimals)
    );
    reserves.reserve1 = parseFloat(
      utils.formatUnits(rawReserve1, token1Decimals)
    );
  }

  return reserves;
};

// Overrides subgraph data with latest from pair contract
export const usePair = (pair: Pair) => {
  const { magicUsd } = usePrice();
  const { reserve0, reserve1 } = usePairReserves(
    pair.id,
    pair.token0.decimals,
    pair.token1.decimals
  );

  const nextPair = { ...pair };
  nextPair.token0.reserve = reserve0;
  nextPair.token1.reserve = reserve1;
  nextPair.token0.price =
    reserve0 > 0 && reserve1 > 0 ? reserve0 / reserve1 : 0;
  nextPair.token1.price =
    reserve0 > 0 && reserve1 > 0 ? reserve1 / reserve0 : 0;
  nextPair.token0.priceUsd =
    (nextPair.token0.isMagic ? 1 : nextPair.token1.price) * magicUsd;
  nextPair.token1.priceUsd =
    (nextPair.token1.isMagic ? 1 : nextPair.token0.price) * magicUsd;
  return nextPair;
};
