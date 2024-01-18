import { Dialog, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Link,
  Outlet,
  useFetcher,
  useLoaderData,
  useLocation,
  useParams,
} from "@remix-run/react";
import { Fragment, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

import { SlashIcon, SpinnerIcon } from "~/components/Icons";
import { TokenLogo } from "~/components/TokenLogo";
import type { Pair } from "~/types";
import { createMetaTags } from "~/utils/meta";
import { formatPercent } from "~/utils/number";
import { getPairs } from "~/utils/pair.server";

type LoaderData = {
  pairs: Pair[];
};

export const meta: MetaFunction = () => createMetaTags("Pools | Magicswap");

const tabs = [
  { name: "Manage Liquidity", href: "manage" },
  { name: "Analytics", href: "analytics" },
];

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const name = url.searchParams.get("name")?.toUpperCase();

  const pairs = await getPairs({
    name_contains: name,
  });

  if (pairs.length > 0 && !params.poolId) {
    return redirect(`/pools/${pairs[0]?.id}/manage`);
  }

  return json<LoaderData>({ pairs });
};

export default function Pools() {
  const { pairs } = useLoaderData<LoaderData>();
  const fetcher = useFetcher<LoaderData>();
  const { poolId } = useParams();
  const location = useLocation();
  const splitPaths = location.pathname.split("/");

  const lastPath = splitPaths[splitPaths.length - 1];

  const filteredPairs = fetcher.data?.pairs ?? pairs;

  const selectedPool = pairs.find((p) => p.id === poolId);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.currentTarget.value;
    const searchParams = new URLSearchParams();
    searchParams.set("name", name);
    fetcher.load(`/pools?${searchParams.toString()}`);
  }

  const isLoading = fetcher.state === "loading";

  useEffect(() => {
    setMobileFiltersOpen(false);
  }, [location.pathname]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    <div className="mb-12 flex flex-1 flex-col">
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex xl:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto border border-night-800 bg-[#131D2E] pt-4 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-night-200">
                  Choose Pool
                </h2>
                <button
                  className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-night-400 hover:text-night-500"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="p-2">
                <fetcher.Form>
                  <label htmlFor="liquidity-pools" className="sr-only">
                    Liquidity Pool
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <input
                      type="text"
                      name="liquidity-pools"
                      id="liquidity-pools"
                      onChange={handleChange}
                      className="block w-full rounded-md border-night-700 bg-night-900 pr-10 text-sm focus:border-night-500 focus:ring-night-500"
                      placeholder="Search for liquidity pools"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      {isLoading ? (
                        <SpinnerIcon className="h-5 w-5 animate-spin fill-night-900 text-night-700" />
                      ) : (
                        <MagnifyingGlassIcon
                          className="h-5 w-5 text-night-700"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </div>
                </fetcher.Form>
              </div>
              <div className="mt-4 flex min-h-0 flex-1 flex-col">
                <div className="sticky top-0 z-10 flex justify-between border-b-[0.5px] border-night-600 px-6 py-2 text-sm font-medium text-night-500">
                  <h3>Pools</h3>
                  <h3>APY</h3>
                </div>
                <div className="flex-1 overflow-auto">
                  <ul>
                    {filteredPairs.map((pair) => (
                      <PoolLink
                        pair={pair}
                        lastPath={lastPath ?? ""}
                        key={pair.id}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <div className="mt-2 grid grid-cols-6 pb-2 pt-6 xl:gap-x-4 xl:py-6">
        <div className="col-span-6 flex items-end xl:col-span-2">
          <h2 className="text-2xl font-medium">Pools</h2>
        </div>
        {poolId ? (
          <ol className="col-span-6 mt-8 flex items-center justify-center space-x-2 sm:space-x-4 xl:col-span-4 xl:mt-0">
            {tabs.map((tab, i) => {
              const isActive = tab.href === lastPath;

              const notFirstTab = i > 0;
              return (
                <li key={tab.name}>
                  <div className="flex items-center">
                    {notFirstTab && (
                      <SlashIcon className="h-10 w-10 flex-shrink-0 text-night-400" />
                    )}
                    <Link
                      to={`/pools/${poolId}/${tab.href}`}
                      prefetch="intent"
                      className={twMerge(
                        isActive
                          ? "border-ruby-900 text-white"
                          : "border-transparent text-night-500 hover:border-night-600 hover:text-night-700",
                        notFirstTab && "ml-4",
                        "border-b-2 py-2 text-base font-medium sm:text-xl",
                      )}
                    >
                      {tab.name}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : null}
        <div className="relative col-span-6 mt-4 block xl:hidden">
          <div className="group block rounded-md border border-night-800 bg-[#131D2E] p-4 focus-within:ring-2 focus-within:ring-ruby-500 focus-within:ring-offset-2 focus-within:ring-offset-night-100">
            {selectedPool ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-4">
                    <TokenLogo
                      token={selectedPool.token0}
                      className="h-8 w-8 rounded-full ring-1"
                    />
                    <TokenLogo
                      token={selectedPool.token1}
                      className="h-8 w-8 rounded-full ring-1"
                    />
                  </div>
                  <p className="text-xs font-medium sm:text-sm">
                    {selectedPool.name}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-bold sm:text-base">
                    {formatPercent(selectedPool.apy)}
                  </p>
                  <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>Select a pool</div>
                <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
              </div>
            )}
            <button
              className="absolute inset-0 h-full w-full focus:outline-none"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">
                View details for {selectedPool?.name}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2 grid flex-1 grid-cols-6 gap-x-4">
        <div className="hidden h-[calc(100vh-256px)] flex-col overflow-hidden rounded-md border border-night-800 bg-[#131D2E] xl:col-span-2 xl:flex">
          <div className="p-6">
            <fetcher.Form>
              <label htmlFor="liquidity-pools" className="sr-only">
                Liquidity Pool
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  name="liquidity-pools"
                  id="liquidity-pools"
                  onChange={handleChange}
                  className="block w-full rounded-md border-night-700 bg-night-900 pr-10 focus:border-night-500 focus:ring-night-500 sm:text-sm"
                  placeholder="Search for liquidity pools"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  {isLoading ? (
                    <SpinnerIcon className="h-5 w-5 animate-spin fill-night-900 text-night-700" />
                  ) : (
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-night-700"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>
            </fetcher.Form>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="sticky top-0 z-10 flex justify-between border-b-[0.5px] border-night-600 px-6 pb-2 text-sm font-medium text-night-500">
              <h3>Pools</h3>
              <h3>APY</h3>
            </div>
            <div className="flex-1 overflow-auto">
              <ul>
                {filteredPairs.map((pair) => (
                  <PoolLink
                    pair={pair}
                    lastPath={lastPath ?? ""}
                    key={pair.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-6 xl:col-span-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const PoolLink = ({ pair, lastPath }: { pair: Pair; lastPath: string }) => {
  const { poolId } = useParams();
  const isActive = pair.id === poolId;
  return (
    <li>
      <Link
        to={`/pools/${pair.id}/${lastPath === "pools" ? "manage" : lastPath}`}
        prefetch="intent"
        className="focus:outline-none"
      >
        <div
          className={twMerge(
            "group flex items-center border-l-2 px-6 py-5",
            isActive
              ? "border-ruby-900 bg-ruby-500/10 text-ruby-600"
              : "border-transparent hover:border-ruby-300",
          )}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-4">
                <TokenLogo
                  token={pair.token0}
                  alt="placeholder"
                  className="h-8 w-8 rounded-full"
                />
                <TokenLogo
                  token={pair.token1}
                  alt="placeholder"
                  className="z-10 h-8 w-8 rounded-full"
                />
              </div>
              <p
                className={twMerge(
                  "text-sm font-medium",
                  isActive
                    ? "text-ruby-500"
                    : "text-night-400 group-hover:text-night-200",
                )}
              >
                {pair.name}
              </p>
            </div>
            <p className={twMerge("font-bold", isActive && "text-ruby-500")}>
              {formatPercent(pair.apy)}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};
