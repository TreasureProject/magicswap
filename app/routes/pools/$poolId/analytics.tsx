import { useEffect } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  useCatch,
  useFetcher,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { TimeIntervalLineGraph } from "~/components/Graph";
import { formatCurrency, formatNumber, formatUsd } from "~/utils/number";
import { getPairById } from "~/utils/pair.server";
import type { Pair, Swap } from "~/types";
import { getSwaps } from "~/utils/swap.server";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import { chain, useNetwork } from "wagmi";
import { usePrice } from "~/context/priceContext";
import { createMetaTags } from "~/utils/meta";
import { TokenLogo } from "~/components/TokenLogo";
import { truncateEthAddress } from "~/utils/address";

type LoaderData = {
  pair: Pair;
  swaps: Swap[];
};

export const meta: MetaFunction = ({ data }: { data: LoaderData }) =>
  createMetaTags(`${data.pair.name} - Analytics | MagicSwap`);

export const loader: LoaderFunction = async ({ params: { poolId } }) => {
  invariant(poolId, `poolId is required`);

  const [pair, swaps] = await Promise.all([
    getPairById(poolId, process.env.EXCHANGE_ENDPOINT),
    getSwaps(poolId, process.env.EXCHANGE_ENDPOINT),
  ]);

  if (!pair) {
    throw new Response("Pool not found", {
      status: 404,
    });
  }

  return json<LoaderData>({
    pair,
    swaps,
  });
};

export default function Analytics() {
  const data = useLoaderData<LoaderData>();

  const { poolId } = useParams();

  const { load, data: fetchedData } = useFetcher<LoaderData>();
  const { chain: activeChain } = useNetwork();
  const { magicUsd } = usePrice();

  useEffect(() => {
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
    <div className="space-y-6">
      <div className="flex flex-col divide-y divide-night-700 rounded-md border border-night-800 bg-[#131D2E] sm:flex-row sm:divide-y-0 sm:divide-x">
        <div className="flex-1 p-4">
          <div className="flex justify-between">
            <p className="col-span-4 text-[0.6rem] text-night-500 sm:text-xs">
              {pair.name}
            </p>
            <p className="col-span-2 text-[0.6rem] text-night-500 sm:text-xs">
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
              {formatUsd(pair.liquidityMagic * magicUsd)}
            </p>
          </div>
          <div className="h-36 sm:h-40">
            <TimeIntervalLineGraph
              gradient={{
                from: "#96e4df",
                to: "#21d190",
              }}
              data={pair.liquidity1dMagicIntervals}
            />
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="flex justify-between">
            <p className="col-span-4 text-[0.6rem] text-night-500 sm:text-xs">
              {pair.name}
            </p>
            <p className="col-span-2 text-[0.6rem] text-night-500 sm:text-xs">
              Past 24h
            </p>
          </div>
          <div className="flex justify-between">
            <h3 className="col-span-4 font-semibold">Volume</h3>
            <p className="col-span-2 font-semibold">
              {formatUsd(pair.volume1dMagic * magicUsd)}{" "}
            </p>
          </div>
          <div className="h-36 sm:h-40">
            <TimeIntervalLineGraph
              gradient={{
                from: "#96e4df",
                to: "#21d190",
              }}
              data={pair.volume1dMagicIntervals}
            />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-medium">Pool Composition</h2>
        <div className="overflow-hidden rounded-md border border-night-700 bg-[#131D2E]">
          <table className="min-w-full divide-y divide-night-700">
            <thead className="sticky top-0 z-10 bg-night-900">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 px-4 text-left text-xs font-semibold text-night-400"
                >
                  Token
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-4 text-left text-xs font-semibold text-night-400"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <TokenLogo
                      token={pair.token0}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="font-medium">{pair.token0.symbol}</span>
                  </div>
                </td>
                <td className="p-4">{formatNumber(pair.token0.reserve)}</td>
              </tr>
              <tr>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <TokenLogo
                      token={pair.token1}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="font-medium">{pair.token1.symbol}</span>
                  </div>
                </td>
                <td className="p-4">{formatNumber(pair.token1.reserve)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-medium">Transactions</h2>
          <a
            className="flex items-center gap-1 text-right text-xs text-night-400 hover:underline"
            href={`https://dexscreener.com/arbitrum/${pair.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            More on DEX Screener
            <ExternalLinkIcon className="h-3 w-3" />
          </a>
        </div>
        <div className="max-h-96 flex-1 overflow-auto rounded-md border border-night-700 bg-[#131D2E]">
          <table className="min-w-full divide-y divide-night-700">
            <thead className="sticky top-0 z-10 bg-night-900">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-[0.6rem] font-semibold text-night-400 sm:pl-6 sm:text-xs"
                >
                  In
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-[0.6rem] font-semibold text-night-400 sm:pl-6 sm:text-xs"
                >
                  Out
                </th>
                <th
                  scope="col"
                  className="hidden pl-6 text-left text-xs font-semibold text-night-400 sm:table-cell"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-2 py-2.5 text-left text-[0.6rem] font-semibold text-night-400 sm:text-xs md:px-3 md:py-3.5"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {swaps.map((swap) => {
                const tokenIn = swap.isAmount0In ? pair.token0 : pair.token1;
                const tokenOut = swap.isAmount0In ? pair.token1 : pair.token0;
                return (
                  <tr key={swap.id}>
                    <td className="whitespace-nowrap px-2 py-2.5 text-xs text-night-500 sm:text-sm md:px-3 md:py-2.5">
                      <div className="flex items-center gap-1.5">
                        <TokenLogo
                          className="h-4 w-4 rounded-full ring-1"
                          token={tokenIn}
                        />
                        <span>
                          <span className="font-semibold text-white">
                            {formatCurrency(swap.inAmount)}
                          </span>{" "}
                          {tokenIn.symbol}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-2 py-2.5 text-xs text-night-500 sm:text-sm md:px-3 md:py-2.5">
                      <div className="flex items-center gap-1.5">
                        <TokenLogo
                          className="h-4 w-4 rounded-full ring-1"
                          token={tokenOut}
                        />
                        <span>
                          <span className="font-semibold text-white">
                            {formatCurrency(swap.outAmount)}
                          </span>{" "}
                          {tokenOut.symbol}
                        </span>
                      </div>
                    </td>
                    <td
                      className="hidden whitespace-nowrap px-3 py-2.5 text-sm text-night-500 sm:table-cell"
                      title={swap.userAddress}
                    >
                      <a
                        href={`${
                          (activeChain ?? chain.arbitrum).blockExplorers
                            ?.default.url ?? "https://arbiscan.io"
                        }/address/${swap.userAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-1"
                      >
                        <span className="group-hover:underline">
                          {truncateEthAddress(swap.userAddress)}
                        </span>
                        <ExternalLinkIcon className="h-3 w-3 md:h-4 md:w-4" />
                      </a>
                    </td>
                    <td
                      className="whitespace-nowrap px-2 py-2.5 text-xs text-night-500 sm:text-sm md:px-3 md:py-2.5"
                      title={new Date(swap.date * 1000).toLocaleString()}
                    >
                      <a
                        href={`${
                          (activeChain ?? chain.arbitrum).blockExplorers
                            ?.default.url ?? "https://arbiscan.io"
                        }/tx/${swap.transactionId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-1"
                      >
                        <span className="group-hover:underline">
                          {swap.formattedDate}
                        </span>
                        <ExternalLinkIcon className="h-3 w-3 md:h-4 md:w-4" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
        <p className="text-[0.6rem] text-night-500 sm:text-base">
          {params.poolId} not found.
        </p>
      </div>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}
