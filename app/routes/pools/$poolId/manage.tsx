import { Link, useParams, useSearchParams } from "@remix-run/react";
import cn from "clsx";

const tabs = [
  { name: "Liquidity", query: "liquidity" },
  { name: "Stake", query: "stake" },
  { name: "Rewards", query: "rewards" },
];

export default function Manage() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const selectedTab =
    tabs.find(({ query }) => query === searchParams.get("tab")) ?? tabs[0];

  return (
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
  );
}
