import {
  Link,
  useLocation,
  useMatches,
  useParams,
  useSearchParams,
} from "@remix-run/react";
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
                  ? "border-red-500 text-white bg-gray-500/20"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "whitespace-nowrap py-3 sm:py-4 px-4 sm:px-8 border-t-2 font-medium text-xs sm:text-sm flex-1 sm:flex-none sm:text-left text-center"
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
