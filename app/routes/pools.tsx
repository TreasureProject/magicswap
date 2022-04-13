import { SearchIcon } from "@heroicons/react/solid";
import { Link, Outlet } from "@remix-run/react";

const pairs = [
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
    id: 1,
  },
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
    id: 2,
  },
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
    id: 3,
  },
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
    id: 4,
  },
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
    id: 5,
  },
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
    id: 6,
  },
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
    id: 7,
  },
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
    id: 8,
  },
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
    id: 9,
  },
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
    id: 10,
  },
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
    id: 11,
  },
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
    id: 12,
  },
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
    id: 13,
  },
];

export default function Pools() {
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
                  <li
                    key={pair.id}
                    className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-900 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-500"
                  >
                    <div className="flex justify-between w-full items-center">
                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-4">
                          <img
                            src="https://via.placeholder.com/400"
                            alt="placeholder"
                            className="w-8 h-8 rounded-full ring-2 z-10"
                          />
                          <img
                            src="https://via.placeholder.com/400"
                            alt="placeholder"
                            className="w-8 h-8 rounded-full ring-2"
                          />
                        </div>
                        <p className="text-sm text-gray-400 font-medium">
                          {pair.pair}
                        </p>
                      </div>
                      <div>
                        <Link
                          to={`/pools/${pair.id}/manage`}
                          className="focus:outline-none"
                        >
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          ></span>
                        </Link>
                        <p className="font-bold">{pair.apy}</p>
                      </div>
                    </div>
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
