import * as React from "react";
import { ArrowRightIcon } from "@heroicons/react/solid";
import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  useCatch,
  useFetcher,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { TimeIntervalLineGraph } from "~/components/Graph";
import { Pill } from "~/components/Pill";
import { formatUsd } from "~/utils/price";
import { formatNumber } from "~/utils/number";
import { getPairById } from "~/utils/pair.server";
import type { Pair, Swap } from "~/types";
import { getSwaps } from "~/utils/swap.server";
import { getEnvVariable } from "~/utils/env.server";

type LoaderData = {
  randomNumber: number;
  pair: Pair;
  swaps: Swap[];
};

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => ({
  title: `${data.pair.name} - Analytics | Magicswap`,
});

export const loader: LoaderFunction = async ({
  params: { poolId },
  context,
}) => {
  const exchangeUrl = getEnvVariable("EXCHANGE_ENDPOINT", context);

  const randomNumber = Math.floor(Math.random() * 6);

  invariant(poolId, `poolId is required`);

  const [pair, swaps] = await Promise.all([
    getPairById(poolId, exchangeUrl),
    getSwaps(poolId, exchangeUrl),
  ]);

  if (!pair) {
    throw new Response("Pool not found", {
      status: 404,
    });
  }

  return json<LoaderData>({
    randomNumber,
    pair,
    swaps,
  });
};

export default function Analytics() {
  const data = useLoaderData<LoaderData>();

  const { poolId } = useParams();

  const { load, data: fetchedData } = useFetcher<LoaderData>();

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        load(`/pools/${poolId}/analytics`);
      }
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, [load, poolId]);

  const pair = fetchedData?.pair ?? data.pair;
  const swaps = fetchedData?.swaps ?? data.swaps;

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col divide-y divide-gray-700 sm:flex-row sm:divide-y-0 sm:divide-x">
        <div className="flex-1 p-4">
          <div className="flex justify-between">
            <p className="col-span-4 text-[0.6rem] text-gray-500 sm:text-xs">
              {pair.name}
            </p>
            <p className="col-span-2 text-[0.6rem] text-gray-500 sm:text-xs">
              {new Date().toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex justify-between">
            <h3 className="col-span-4 font-semibold">Liquidity</h3>
            <p className="col-span-2 font-semibold">
              {formatUsd(pair.liquidityUsd)}
            </p>
          </div>
          <div className="h-36 sm:h-40">
            <TimeIntervalLineGraph
              gradient={{
                from: "#96e4df",
                to: "#21d190",
              }}
              data={pair.liquidity1dUsdIntervals}
            />
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="flex justify-between">
            <p className="col-span-4 text-[0.6rem] text-gray-500 sm:text-xs">
              {pair.name}
            </p>
            <p className="col-span-2 text-[0.6rem] text-gray-500 sm:text-xs">
              Past 24h
            </p>
          </div>
          <div className="flex justify-between">
            <h3 className="col-span-4 font-semibold">Volume</h3>
            <p className="col-span-2 font-semibold">
              {formatUsd(pair.volume1dUsd)}{" "}
            </p>
          </div>
          <div className="h-36 sm:h-40">
            <TimeIntervalLineGraph
              gradient={{
                from: "#96e4df",
                to: "#21d190",
              }}
              data={pair.volume1dUsdIntervals}
            />
          </div>
        </div>
      </div>
      <div className="max-h-96 flex-1 overflow-auto border-t border-gray-700 sm:-mx-6 md:mx-0 lg:max-h-full">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="sticky top-0 z-10 bg-[#1C1C24]">
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
            {swaps.map((swap) => (
              <tr key={swap.id}>
                <td className="whitespace-nowrap py-2.5 pl-4 pr-3 text-sm font-medium sm:pl-6">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <Pill
                      text={
                        swap.isAmount0In
                          ? pair.token0.symbol
                          : pair.token1.symbol
                      }
                      enumValue={data.randomNumber}
                    />
                    <ArrowRightIcon className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                    <Pill
                      text={
                        swap.isAmount0Out
                          ? pair.token0.symbol
                          : pair.token1.symbol
                      }
                      enumValue={data.randomNumber}
                    />
                  </div>
                </td>
                <td className="table-cell whitespace-nowrap px-3 py-2.5 text-[0.6rem] font-semibold text-gray-200 sm:text-sm">
                  {formatUsd(swap.amountUsd)}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-2.5 text-sm text-gray-400 sm:table-cell">
                  {formatNumber(swap.inAmount)}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-2.5 text-sm text-gray-400 sm:table-cell">
                  {formatNumber(swap.outAmount)}
                </td>
                <td
                  className="whitespace-nowrap px-3 py-2.5 text-[0.6rem] text-gray-500 sm:text-sm"
                  title={new Date(swap.date * 1000).toLocaleString()}
                >
                  {swap.formattedDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  if (caught.status === 404) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-[0.6rem] text-gray-500 sm:text-base">
          {params.poolId} not found.
        </p>
      </div>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}
