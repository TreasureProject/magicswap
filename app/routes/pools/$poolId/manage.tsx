import { PlusIcon } from "@heroicons/react/solid";
import { Link, useParams, useSearchParams } from "@remix-run/react";
import cn from "clsx";
import { Button } from "~/components/Button";

const tabs = [
  { name: "Liquidity", query: "liquidity" },
  { name: "Stake", query: "stake" },
  { name: "Rewards", query: "rewards" },
] as const;

const TokenInput = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <label htmlFor="balance" className="sr-only">
        Balance
      </label>
      <div className="relative focus-within:border-red-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center space-x-2 pl-3 pb-4">
          <img
            src="https://via.placeholder.com/400"
            alt="placeholder"
            className="z-10 h-4 w-4 rounded-full ring-1"
          />
          <span className="block font-semibold text-white sm:text-sm">
            MAGIC
          </span>
        </div>
        <input
          type="text"
          name="balance"
          id="balance"
          dir="rtl"
          className="block w-full rounded-md border-0 bg-gray-900 pl-7 pb-6 focus:outline-none focus:ring-2 focus:ring-red-600 sm:text-lg lg:text-2xl"
          placeholder="0.00"
        />
        <div className="pointer-events-none absolute left-0 bottom-2 flex flex-col items-end pl-3">
          <span className="text-xs text-gray-500">Balance: 123123</span>
        </div>
        <div className="pointer-events-none absolute bottom-2 right-0 flex flex-col items-end pr-3">
          <span className="text-xs text-gray-500">~ $123.45</span>
        </div>
      </div>
    </div>
  );
};

export default function Manage() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const selectedTab =
    tabs.find(({ query }) => query === searchParams.get("tab")) ?? tabs[0];

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-700">
        <nav className="-mb-px flex" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = tab.name === selectedTab.name;
            return (
              <Link
                key={tab.name}
                to={`/pools/${params.poolId}/manage?tab=${tab.query}`}
                className={cn(
                  isActive
                    ? "border-red-500 bg-gray-500/20 text-white"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "flex-1 whitespace-nowrap border-t-2 py-3 px-4 text-center text-xs font-medium sm:flex-none sm:py-4 sm:px-8 sm:text-left sm:text-sm"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>
      {(() => {
        switch (selectedTab.query) {
          case "liquidity":
            return (
              <div className="flex flex-1 items-center justify-center px-3 py-8">
                <div className="grid grid-cols-7 gap-y-4">
                  <TokenInput className="col-span-7 xl:col-span-3" />
                  <PlusIcon className="col-span-7 h-4 w-4 justify-self-center text-gray-400 xl:col-span-1 xl:place-self-center" />
                  <TokenInput className="col-span-7 xl:col-span-3" />
                  <div className="col-span-7 w-full xl:col-start-5 xl:col-end-8">
                    <Button>Add Liquidity</Button>
                  </div>
                </div>
              </div>
            );
          case "stake":
            return <div>Stake</div>;
          case "rewards":
            return <div>Rewards</div>;
        }
      })()}
    </div>
  );
}
