import { SearchIcon } from "@heroicons/react/solid";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { GetPairsQuery } from "~/graphql/generated";
import { sdk } from "~/utils/api.server";
import { getApr } from "~/utils/price";
import cn from "clsx";

type LoaderData = {
  pairs: GetPairsQuery["pairs"];
};

export const loader: LoaderFunction = async () => {
  const { pairs } = await sdk.getPairs({
    where: { token0: "0x539bde0d7dbd336b79148aa742883198bbf60342" },
  });

  return json<LoaderData>({ pairs });
};

export default function Pools() {
  const { pairs } = useLoaderData<LoaderData>();
  return (
    <div className="my-12 flex flex-1 flex-col">
      <h2 className="text-xl font-medium">Pools</h2>
      <div className="mt-6 grid flex-1 grid-cols-6 gap-x-4">
        <div className="col-span-2 flex flex-col bg-gray-800 h-[calc(100vh-256px)]">
          <div className="p-6">
            <label htmlFor="liquidity-pools" className="sr-only">
              Liquidity Pool
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="text"
                name="liquidity-pools"
                id="liquidity-pools"
                className="block w-full rounded-md border-gray-700 bg-gray-900 pr-10 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                placeholder="Search for liquidity pools"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <SearchIcon
                  className="h-5 w-5 text-gray-700"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="sticky top-0 z-10 border-b-[0.5px] border-gray-600 px-6 pb-2 text-sm font-medium text-gray-500 flex justify-between">
              <h3>Pools</h3>
              <h3>APR</h3>
            </div>
            <div className="flex-1 overflow-auto">
              <ul>
                {pairs.map((pair) => (
                  <li key={pair.id}>
                    <NavLink
                      to={`/pools/${pair.id}/manage`}
                      prefetch="intent"
                      className="focus:outline-none"
                    >
                      {({ isActive }) => (
                        <div
                          className={cn(
                            "px-6 py-5 flex items-center space-x-3",
                            {
                              "bg-gray-900 border-gray-600 text-gray-600 border-l-4":
                                isActive,
                              "hover:bg-gray-900": !isActive,
                            }
                          )}
                        >
                          <div className="flex justify-between w-full items-center">
                            <div className="flex items-center space-x-4">
                              <div className="flex -space-x-4">
                                <img
                                  src="https://via.placeholder.com/400"
                                  alt="placeholder"
                                  className="w-8 h-8 rounded-full ring-2 z-10 ring-gray-800"
                                />
                                <img
                                  src="https://via.placeholder.com/400"
                                  alt="placeholder"
                                  className="w-8 h-8 rounded-full ring-2 ring-gray-800"
                                />
                              </div>
                              <p
                                className={cn(
                                  "text-sm text-gray-400 font-medium",
                                  {
                                    "text-gray-200": isActive,
                                  }
                                )}
                              >
                                {pair.name}
                              </p>
                            </div>
                            <p
                              className={cn("font-bold", {
                                "text-gray-50": isActive,
                              })}
                            >
                              {getApr(pair.volumeUSD, pair.reserveUSD)}%
                            </p>
                          </div>
                        </div>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-4 bg-gray-800">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
