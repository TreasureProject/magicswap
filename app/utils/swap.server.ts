import { exchangeSdk } from "./api";
import { getTimeAgo } from "./date.server";
import type { GetSwapsQuery } from "~/graphql/exchange.generated";
import type { Swap } from "~/types";

type RawSwap = GetSwapsQuery["swaps"][0];

const normalizeSwap = ({
  id,
  timestamp,
  to: userAddress,
  amount0In: rawAmount0In,
  amount1In: rawAmount1In,
  amount0Out: rawAmount0Out,
  amount1Out: rawAmount1Out,
  transaction: { id: transactionId },
}: RawSwap): Swap => {
  const amount0In = parseFloat(rawAmount0In);
  const amount1In = parseFloat(rawAmount1In);
  const amount0Out = parseFloat(rawAmount0Out);
  const amount1Out = parseFloat(rawAmount1Out);
  return {
    id,
    date: timestamp,
    formattedDate: getTimeAgo(timestamp),
    transactionId,
    userAddress,
    isAmount0In: amount0In > 0,
    isAmount0Out: amount0Out > 0,
    inAmount: amount0In || amount1In,
    outAmount: amount0Out || amount1Out,
  };
};

export const getSwaps = async (pairId: string): Promise<Swap[]> => {
  const { swaps } = await exchangeSdk.getSwaps({
    where: {
      pair: pairId,
    },
  });

  return swaps.map(normalizeSwap);
};
