import * as React from "react";
import { ChevronDownIcon, SearchIcon, XIcon } from "@heroicons/react/solid";
import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import type { ShouldReloadFunction } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { useLocation } from "@remix-run/react";
import { useParams } from "@remix-run/react";
import { Outlet, useLoaderData } from "@remix-run/react";
import { blocksSdk, exchangeSdk } from "~/utils/api.server";
import { getApr } from "~/utils/price";
import { getOneDayFilter, getOneWeekFilter } from "~/utils/time.server";
import cn from "clsx";
import { Dialog, Transition } from "@headlessui/react";
import { SlashIcon, SpinnerIcon } from "~/components/Icons";
import type { Pair_Filter } from "~/graphql/exchange.generated";
import { formatPercent } from "~/utils/number";

type Pair = {
  id: string;
  name: string;
  volume1w: number;
  liquidity: number;
};

type LoaderData = {
  pairs: Pair[];
};

export const meta: MetaFunction = () => ({
  title: "Pools | Magicswap",
});

const tabs = [
  { name: "Manage Liquidity", href: "manage" },
  { name: "Analytics", href: "analytics" },
];

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const name = (url.searchParams.get("name") ?? "").toUpperCase();

  const magicFilter: Pair_Filter = {
    token0: "0x539bde0d7dbd336b79148aa742883198bbf60342",
    name_contains: name,
  };

  const [
    {
      blocks: [{ number: block1d }],
    },
    {
      blocks: [{ number: block1w }],
    },
    { pairs },
  ] = await Promise.all([
    blocksSdk.getBlocks({
      where: getOneDayFilter(),
    }),
    blocksSdk.getBlocks({
      where: getOneWeekFilter(),
    }),
    exchangeSdk.getPairs({
      where: magicFilter,
    }),
  ]);

  const [{ pairs: pairs1d }, { pairs: pairs1w }] = await Promise.all([
    exchangeSdk.getPairs({
      where: magicFilter,
      block: { number: parseInt(block1d) },
    }),
    exchangeSdk.getPairs({
      where: magicFilter,
      block: { number: parseInt(block1w) },
    }),
  ]);

  return json<LoaderData>({
    pairs: pairs.map((pair) => {
      const { id, name, volumeUSD, reserveUSD: liquidity } = pair;
      const pair1d = pairs1d.find(({ id: id1d }) => id1d === id) ?? pair;
      const pair1w = pairs1w.find(({ id: id1w }) => id1w === id) ?? pair1d;
      return {
        id,
        name,
        volume1w: volumeUSD - pair1w.volumeUSD,
        liquidity,
      };
    }),
  });
};

// Changing query params on pools/:poolId/manage route automatically reloads all parent loaders, but we don't have to do that here.
export const unstable_shouldReload: ShouldReloadFunction = () => false;

export default function Pools() {
  const { pairs } = useLoaderData<LoaderData>();
  const fetcher = useFetcher<LoaderData>();
  const { poolId } = useParams();
  const location = useLocation();
  const splitPaths = location.pathname.split("/");

  const lastPath = splitPaths[splitPaths.length - 1];

  const filteredPairs = fetcher.data?.pairs ?? pairs;

  const selectedPool = pairs.find((p) => p.id === poolId);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.currentTarget.value;
    const searchParams = new URLSearchParams();
    searchParams.set("name", name);
    fetcher.load(`/pools?${searchParams.toString()}`);
  }

  const isLoading = fetcher.state === "loading";

  React.useEffect(() => {
    setMobileFiltersOpen(false);
  }, [location.pathname]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);
  return (
    <div className="my-12 flex flex-1 flex-col">
      <Transition.Root show={mobileFiltersOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={React.Fragment}
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
            as={React.Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-gray-800 pt-4 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-200">
                  Choose Pool
                </h2>
                <button
                  className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
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
                      className="block w-full rounded-md border-gray-700 bg-gray-900 pr-10 text-sm focus:border-gray-500 focus:ring-gray-500"
                      placeholder="Search for liquidity pools"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      {isLoading ? (
                        <SpinnerIcon className="h-5 w-5 animate-spin fill-gray-900 text-gray-700" />
                      ) : (
                        <SearchIcon
                          className="h-5 w-5 text-gray-700"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </div>
                </fetcher.Form>
              </div>
              <div className="mt-4 flex min-h-0 flex-1 flex-col">
                <div className="sticky top-0 z-10 flex justify-between border-b-[0.5px] border-gray-600 px-6 py-2 text-sm font-medium text-gray-500">
                  <h3>Pools</h3>
                  <h3>APR</h3>
                </div>
                <div className="flex-1 overflow-auto">
                  <ul>
                    {filteredPairs.map((pair) => (
                      <PoolLink pair={pair} lastPath={lastPath} key={pair.id} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <div className="mt-2 grid grid-cols-6 pb-2 pt-6 lg:mt-6 lg:gap-x-4 lg:py-6">
        <div className="col-span-6 flex items-end lg:col-span-2">
          <h2 className="text-2xl font-medium">Pools</h2>
        </div>
        {poolId ? (
          <ol className="col-span-6 mt-8 flex items-center justify-center space-x-2 sm:space-x-4 lg:col-span-4 lg:mt-0">
            {tabs.map((tab, i) => {
              const isActive = tab.href === lastPath;

              const notFirstTab = i > 0;
              return (
                <li key={tab.name}>
                  <div className="flex items-center">
                    {notFirstTab && (
                      <SlashIcon className="h-10 w-10 flex-shrink-0 text-gray-400" />
                    )}
                    <Link
                      to={`/pools/${poolId}/${tab.href}`}
                      prefetch="intent"
                      className={cn(
                        isActive
                          ? "border-red-500 text-white"
                          : "border-transparent text-gray-500 hover:border-gray-600 hover:text-gray-700",
                        notFirstTab && "ml-4",
                        "border-b-2 py-2 text-base font-medium sm:text-xl"
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
        <div className="relative col-span-6 mt-4 block lg:hidden">
          <div className="group block rounded-md bg-gray-800 p-4 focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            {selectedPool ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-4">
                    <img
                      src="https://via.placeholder.com/400"
                      alt="placeholder"
                      className="z-10 h-8 w-8 rounded-full ring-1"
                    />
                    <img
                      src="https://via.placeholder.com/400"
                      alt="placeholder"
                      className="h-8 w-8 rounded-full ring-1"
                    />
                  </div>
                  <p className="text-xs font-medium sm:text-sm">
                    {selectedPool.name}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-bold sm:text-base">
                    {formatPercent(
                      getApr(selectedPool.volume1w, selectedPool.liquidity)
                    )}
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
        <div className="hidden h-[calc(100vh-256px)] flex-col overflow-hidden rounded-md bg-gray-800 lg:col-span-2 lg:flex">
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
                  className="block w-full rounded-md border-gray-700 bg-gray-900 pr-10 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  placeholder="Search for liquidity pools"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  {isLoading ? (
                    <SpinnerIcon className="h-5 w-5 animate-spin fill-gray-900 text-gray-700" />
                  ) : (
                    <SearchIcon
                      className="h-5 w-5 text-gray-700"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>
            </fetcher.Form>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="sticky top-0 z-10 flex justify-between border-b-[0.5px] border-gray-600 px-6 pb-2 text-sm font-medium text-gray-500">
              <h3>Pools</h3>
              <h3>APR</h3>
            </div>
            <div className="flex-1 overflow-auto">
              <ul>
                {filteredPairs.map((pair) => (
                  <PoolLink pair={pair} lastPath={lastPath} key={pair.id} />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-6 overflow-hidden rounded-md bg-gray-800 lg:col-span-4 lg:h-[calc(100vh-256px)]">
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
          className={cn("group flex items-center border-l-2 px-6 py-5", {
            "border-red-600 bg-red-500/10 text-red-600": isActive,
            "border-transparent hover:border-gray-300": !isActive,
          })}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-4">
                <img
                  src="https://via.placeholder.com/400"
                  alt="placeholder"
                  className={cn("z-10 h-8 w-8 rounded-full ring-1", {
                    "ring-red-400": isActive,
                    "ring-gray-800": !isActive,
                  })}
                />
                <img
                  src="https://via.placeholder.com/400"
                  alt="placeholder"
                  className={cn("h-8 w-8 rounded-full ring-1", {
                    "ring-red-400": isActive,
                    "ring-gray-800": !isActive,
                  })}
                />
              </div>
              <p
                className={cn("text-sm font-medium", {
                  "text-red-500": isActive,
                  "text-gray-400 group-hover:text-gray-200": !isActive,
                })}
              >
                {pair.name}
              </p>
            </div>
            <p
              className={cn("font-bold", {
                "text-red-500": isActive,
              })}
            >
              {formatPercent(getApr(pair.volume1w, pair.liquidity))}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};
