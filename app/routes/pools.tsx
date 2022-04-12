import { SearchIcon } from "@heroicons/react/solid";

const pairs = [
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
  },
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
  },
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
  },
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
  },
  {
    pair: "MAGIC-SMOL",
    apy: "256%",
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
            <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-300 px-6 py-1 text-sm font-medium text-gray-500">
              <h3>Pools</h3>
            </div>
            <div className="flex-1 overflow-auto">
              <ul>
                {pairs.map((pair) => (
                  <li>{pair.pair}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-4 bg-gray-800">info</div>
      </div>
    </div>
  );
}
