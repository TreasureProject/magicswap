import { ArrowRightIcon } from "@heroicons/react/solid";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { distanceInWordsToNow } from "date-fns";
import { GraphDataPoint, LineGraph } from "~/components/Graph";
import { Pill } from "~/components/Pill";
import { exchangeSdk } from "~/utils/api.server";
import { formatNumber, formatUsd } from "~/utils/price";

type Swap = {
  id: string;
  inSymbol: string;
  inAmount: number;
  outSymbol: string;
  outAmount: number;
  amount: number;
  date: Date;
};

type PairAnalytics = {
  id: string;
  name: string;
  liquidity: number;
  volume1d: number;
  liquidityGraphData: GraphDataPoint[];
  volumeGraphData: GraphDataPoint[];
  swaps: Swap[];
};

type LoaderData = {
  randomNumber: number;
  pairAnalytics?: PairAnalytics;
};

export const loader: LoaderFunction = async ({ params: { poolId } }) => {
  const randomNumber = Math.floor(Math.random() * 6);

  let pairAnalytics: PairAnalytics | undefined;
  if (poolId) {
    const { pair } = await exchangeSdk.getPairAnalytics({ pair: poolId });
    if (pair) {
      pairAnalytics = {
        id: poolId,
        name: pair.name,
        liquidity: parseFloat(pair.reserveUSD),
        volume1d: pair.hourData.reduce(
          (total, { volumeUSD }) => total + parseFloat(volumeUSD),
          0
        ),
        liquidityGraphData: pair.hourData.map(({ date, reserveUSD }) => ({
          x: date,
          y: parseFloat(reserveUSD),
        })),
        volumeGraphData: pair.hourData.map(({ date, volumeUSD }) => ({
          x: date,
          y: parseFloat(volumeUSD),
        })),
        swaps: pair.swaps.map((swap) => {
          const amount0In = parseFloat(swap.amount0In);
          const amount1In = parseFloat(swap.amount1In);
          const amount0Out = parseFloat(swap.amount0Out);
          const amount1Out = parseFloat(swap.amount1Out);
          return {
            id: swap.id,
            inSymbol: amount0In > 0 ? pair.token0.symbol : pair.token1.symbol,
            inAmount: amount0In || amount1In,
            outSymbol: amount0Out > 0 ? pair.token0.symbol : pair.token1.symbol,
            outAmount: amount0Out || amount1Out,
            amount: parseFloat(swap.amountUSD),
            date: new Date(swap.timestamp * 1000),
          };
        }),
      };
    }
  }

  return json<LoaderData>({
    randomNumber,
    pairAnalytics,
  });
};

export default function Analytics() {
  const { randomNumber, pairAnalytics } = useLoaderData<LoaderData>();

  return (
    <div>
      <div className="flex flex-col divide-y divide-gray-700 sm:flex-row sm:divide-y-0 sm:divide-x">
        <div className="grid flex-1 grid-cols-6 p-4">
          <p className="col-span-4 text-xs text-gray-500">
            {pairAnalytics?.name}
          </p>
          <p className="col-span-2 text-xs text-gray-500">
            {new Date().toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <h3 className="col-span-4 font-semibold">Liquidity</h3>
          <p className="col-span-2 font-semibold">
            {pairAnalytics?.liquidity && formatUsd(pairAnalytics.liquidity)}
          </p>
          <div className="col-span-6 h-32">
            <LineGraph
              gradient={{
                from: "#96e4df",
                to: "#21d190",
              }}
              data={pairAnalytics?.liquidityGraphData ?? []}
            />
          </div>
        </div>
        <div className="grid flex-1 grid-cols-6 p-4">
          <p className="col-span-4 text-xs text-gray-500">
            {pairAnalytics?.name}
          </p>
          <p className="col-span-2 text-xs text-gray-500">Past 24h</p>
          <h3 className="col-span-4 font-semibold">Volume</h3>
          <p className="col-span-2 font-semibold">
            {pairAnalytics?.volume1d && formatUsd(pairAnalytics.volume1d)}
          </p>
          <div className="col-span-6 h-32">
            <LineGraph
              gradient={{
                from: "#96e4df",
                to: "#21d190",
              }}
              data={pairAnalytics?.volumeGraphData ?? []}
            />
          </div>
        </div>
      </div>
      <div className="overflow-hidden border-t border-gray-700 sm:-mx-6 md:mx-0">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-[0.6rem] font-semibold text-gray-400 sm:pl-6 sm:text-xs"
              >
                Swap
              </th>
              <th
                scope="col"
                className="table-cell px-3 py-3.5 text-left text-[0.6rem] font-semibold text-gray-400 sm:text-xs"
              >
                Amount
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-[0.6rem] font-semibold text-gray-400 sm:table-cell sm:text-xs"
              >
                In
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-[0.6rem] font-semibold text-gray-400 sm:table-cell sm:text-xs"
              >
                Out
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-[0.6rem] font-semibold text-gray-400 sm:text-xs"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {pairAnalytics?.swaps.map((swap) => (
              <tr key={swap.id}>
                <td className="whitespace-nowrap py-2.5 pl-4 pr-3 text-sm font-medium sm:pl-6">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <Pill text={swap.inSymbol} enumValue={randomNumber} />
                    <ArrowRightIcon className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                    <Pill text={swap.outSymbol} enumValue={randomNumber} />
                  </div>
                </td>
                <td className="table-cell whitespace-nowrap px-3 py-2.5 text-[0.6rem] font-semibold text-gray-200 sm:text-sm">
                  {formatUsd(swap.amount)}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-2.5 text-sm text-gray-400 sm:table-cell">
                  {formatNumber(swap.inAmount)}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-2.5 text-sm text-gray-400 sm:table-cell">
                  {formatNumber(swap.outAmount)}
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 text-[0.6rem] text-gray-500 sm:text-sm">
                  {distanceInWordsToNow(swap.date, { addSuffix: true })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
