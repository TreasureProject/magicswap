import * as React from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import type { ShouldReloadFunction } from "@remix-run/react";
import { useCatch, useLoaderData } from "@remix-run/react";
import { PlusIcon } from "@heroicons/react/solid";
import { Link, useParams, useSearchParams } from "@remix-run/react";
import cn from "clsx";
import invariant from "tiny-invariant";
import { Button } from "~/components/Button";
import { Switch } from "@headlessui/react";
import { formatUsd, getLpTokenCount, getTokenCount } from "~/utils/price";
import { formatNumber } from "~/utils/number";
import { getPairById } from "~/utils/pair.server";
import type { Pair } from "~/types";
import { useAddressBalance, useTokenBalance } from "~/hooks/useTokenBalance";
import { useAddLiquidity } from "~/hooks/useAddLiquidity";
import TokenInput from "~/components/TokenInput";
import { useRemoveLiquidity } from "~/hooks/useRemoveLiquidity";
import { useApproval } from "~/hooks/useApproval";
import { getEnvVariable } from "~/utils/env";
import { NumberField } from "~/components/NumberField";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/Popover";
import { CogIcon } from "@heroicons/react/outline";

type LoaderData = {
  pair: Pair;
};

const tabs = [
  { name: "Liquidity", query: "liquidity" },
  // { name: "Stake", query: "stake" },
  // { name: "Rewards", query: "rewards" },
] as const;

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => ({
  title: `${data.pair.name} - Manage | Magicswap`,
});

export const loader: LoaderFunction = async ({
  params: { poolId },
  context,
}) => {
  const exchangeUrl = getEnvVariable("EXCHANGE_ENDPOINT", context);

  invariant(poolId, `poolId is required`);

  const pair = await getPairById(poolId, exchangeUrl);

  if (!pair) {
    throw new Response("Pool not found", {
      status: 404,
    });
  }

  return json<LoaderData>({ pair });
};

export const unstable_shouldReload: ShouldReloadFunction = () => false;

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
            return <Liquidity />;
          // case "stake":
          //   return <Stake />;
          // case "rewards":
          //   return <div>Rewards</div>;
        }
      })()}
    </div>
  );
}

const Liquidity = () => {
  const [isAddLiquidity, setIsAddLiquidity] = React.useState(true);
  const [removeInputValue, setRemoveInputValue] = React.useState(0);
  const [addInputValues, setAddInputValues] = React.useState<[number, number]>([
    0, 0,
  ]);
  const [advancedSettings, setAdvancedSettings] = React.useState({
    slippage: 0.005,
    deadline: 20,
  });
  const { pair } = useLoaderData<LoaderData>();

  const token0Balance = useTokenBalance(pair.token0);
  const token1Balance = useTokenBalance(pair.token1);
  const lpBalance = useAddressBalance(pair.id);
  const { isApproved: isToken0Approved, approve: approveToken0 } = useApproval(
    pair.token0
  );
  const { isApproved: isToken1Approved, approve: approveToken1 } = useApproval(
    pair.token1
  );
  const addLiquidity = useAddLiquidity();
  const removeLiquidity = useRemoveLiquidity();

  const token0BalanceInsufficient = addInputValues[0] > token0Balance;
  const token1BalanceInsufficient = addInputValues[1] > token1Balance;
  const insufficientBalance =
    token0BalanceInsufficient || token1BalanceInsufficient;
  const isPairApproved = isToken0Approved && isToken1Approved;
  const lpBalanceInsufficient = removeInputValue > lpBalance;
  const removeLiquidityToken0Estimate =
    removeInputValue > 0
      ? getTokenCount(removeInputValue, pair.token0.reserve, pair.totalSupply)
      : 0;
  const removeLiquidityToken1Estimate =
    removeInputValue > 0
      ? getTokenCount(removeInputValue, pair.token1.reserve, pair.totalSupply)
      : 0;

  const handleAdd0InputChanged = (value: number) => {
    setAddInputValues([value, value * pair.token1.price]);
  };

  const handleAdd1InputChanged = (value: number) => {
    setAddInputValues([value * pair.token0.price, value]);
  };

  const handleAddLiquidity = () => {
    addLiquidity(
      pair,
      addInputValues[0],
      addInputValues[1],
      advancedSettings.slippage,
      advancedSettings.deadline
    );
  };

  const handleRemoveLiquidity = () => {
    removeLiquidity(
      pair,
      removeInputValue,
      removeLiquidityToken0Estimate,
      removeLiquidityToken1Estimate,
      advancedSettings.slippage,
      advancedSettings.deadline
    );
  };

  return (
    <div className="flex flex-1 items-center justify-center p-6 lg:p-8">
      <div className="flex max-w-xl flex-1 flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span
              className={cn(
                isAddLiquidity && "text-gray-500",
                "text-[0.6rem] font-bold uppercase sm:text-base"
              )}
            >
              Remove Liquidity
            </span>
            <Switch
              checked={isAddLiquidity}
              onChange={setIsAddLiquidity}
              className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full ring-offset-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <span className="sr-only">
                {isAddLiquidity ? "Remove Liquidity" : "Add Liquidity"}
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute h-full w-full rounded-md bg-gray-800"
              />
              <span
                aria-hidden="true"
                className={cn(
                  isAddLiquidity ? "bg-[#E5003E]" : "bg-gray-200",
                  "pointer-events-none absolute mx-auto h-2.5 w-8 rounded-full transition-colors duration-200 ease-in-out"
                )}
              />
              <span
                aria-hidden="true"
                className={cn(
                  isAddLiquidity ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none absolute left-0 inline-block h-4 w-4 transform rounded-full border border-[#FF4E7E] bg-[#FF4E7E] shadow ring-0 transition-transform duration-200 ease-in-out"
                )}
              />
            </Switch>
            <span
              className={cn(
                !isAddLiquidity && "text-gray-500",
                "text-[0.6rem] font-bold uppercase sm:text-base"
              )}
            >
              Add Liquidity
            </span>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <button className="group">
                <CogIcon
                  className="h-6 w-6 text-gray-200/50 group-hover:text-white"
                  aria-hidden="true"
                />
                <span className="sr-only">Open adjustment settings</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 rounded-lg p-4 shadow-md">
              <h3 className="font-medium text-white">Advanced Settings</h3>

              <div className="mt-2 flex flex-col">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-200">Slippage</p>
                  {advancedSettings.slippage >= 0.06 ? (
                    <p className="text-[0.6rem] text-yellow-500">
                      Your transaction may be frontrun
                    </p>
                  ) : null}
                  <div className="mt-2 flex space-x-2">
                    <button
                      className="rounded-md bg-gray-800/50 py-2 px-3.5 text-[0.6rem] font-medium text-white ring-offset-gray-800 hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-1 sm:text-xs"
                      onClick={() =>
                        setAdvancedSettings({
                          ...advancedSettings,
                          slippage: 0.001,
                        })
                      }
                    >
                      0.1%
                    </button>
                    <button
                      className="rounded-md bg-gray-800/50 py-2 px-3.5 text-[0.6rem] font-medium text-white ring-offset-gray-800 hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-1 sm:text-xs"
                      onClick={() =>
                        setAdvancedSettings({
                          ...advancedSettings,
                          slippage: 0.005,
                        })
                      }
                    >
                      0.5%
                    </button>
                    <button
                      className="rounded-md bg-gray-800/50 py-2 px-3.5 text-[0.6rem] font-medium text-white ring-offset-gray-800 hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-1 sm:text-xs"
                      onClick={() =>
                        setAdvancedSettings({
                          ...advancedSettings,
                          slippage: 0.01,
                        })
                      }
                    >
                      1.0%
                    </button>
                  </div>
                  <div className="mt-2">
                    <NumberField
                      label="Slippage"
                      value={advancedSettings.slippage}
                      onChange={(value) =>
                        setAdvancedSettings({
                          ...advancedSettings,
                          slippage: value,
                        })
                      }
                      minValue={0.001}
                      maxValue={0.49}
                      placeholder="0.5%"
                      formatOptions={{
                        style: "percent",
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 2,
                      }}
                      errorMessage="Slippage must be between 0.1% and 49%"
                      errorCondition={(value) => value > 49}
                    />
                  </div>
                </div>
                <div className="mt-4 flex flex-col">
                  <p className="text-sm text-gray-200">Transaction Deadline</p>
                  <div className="mt-2">
                    <NumberField
                      label="Transaction Deadline"
                      value={advancedSettings.deadline}
                      onChange={(value) =>
                        setAdvancedSettings({
                          ...advancedSettings,
                          deadline: value,
                        })
                      }
                      minValue={1}
                      maxValue={60}
                      placeholder="20"
                      errorMessage="Deadline must be between 1 and 60"
                      errorCondition={(value) => value > 60}
                    >
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-sm text-gray-400">Minutes</span>
                      </div>
                    </NumberField>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {isAddLiquidity ? (
          <div className="space-y-4">
            <TokenInput
              id="addLiquidityToken0"
              label={`${pair.token0.symbol} Amount`}
              token={pair.token0}
              balance={token0Balance}
              value={addInputValues[0]}
              onChange={handleAdd0InputChanged}
            />
            <div className="flex justify-center">
              <PlusIcon className="h-4 w-4 text-gray-400" />
            </div>
            <TokenInput
              id="addLiquidityToken1"
              label={`${pair.token1.symbol} Amount`}
              token={pair.token1}
              balance={token1Balance}
              value={addInputValues[1]}
              onChange={handleAdd1InputChanged}
            />
            {addInputValues.some((value) => value > 0) && (
              <div className="space-y-2 rounded-md bg-gray-900 p-4">
                <p className="text-xs text-gray-600 sm:text-base">
                  You'll receive (at least):
                </p>
                <p className="text-sm font-medium sm:text-lg">
                  ≈{" "}
                  {formatNumber(
                    getLpTokenCount(
                      addInputValues[0],
                      pair.token0.reserve,
                      pair.totalSupply
                    )
                  )}{" "}
                  {pair.name} Pool Tokens
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <TokenInput
              id="removeLiquidity"
              label="Amount"
              tokenSymbol={`${pair.name} LP`}
              price={pair.lpPriceUsd}
              balance={lpBalance}
              value={removeInputValue}
              onChange={(value) => setRemoveInputValue(value)}
            />
            {removeInputValue > 0 && (
              <div className="space-y-2 rounded-md bg-gray-900 p-4">
                <p className="text-xs text-gray-600 sm:text-base">
                  You'll receive (at least):
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {formatNumber(removeLiquidityToken0Estimate)}{" "}
                    {pair.token0.symbol}
                  </span>
                  <span className="text-gray-200">
                    ≈{" "}
                    {formatUsd(
                      removeLiquidityToken0Estimate * pair.token0.priceUsd
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {formatNumber(removeLiquidityToken1Estimate)}{" "}
                    {pair.token1.symbol}
                  </span>
                  <span className="text-gray-200">
                    ={" "}
                    {formatUsd(
                      removeLiquidityToken1Estimate * pair.token1.priceUsd
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
        {isAddLiquidity &&
          addInputValues[0] > 0 &&
          addInputValues[1] > 0 &&
          !isPairApproved &&
          !insufficientBalance && (
            <Button onClick={isToken0Approved ? approveToken1 : approveToken0}>
              Approve{" "}
              {isToken0Approved ? pair.token1.symbol : pair.token0.symbol}
            </Button>
          )}
        <Button
          disabled={
            isAddLiquidity
              ? !addInputValues[0] ||
                !addInputValues[1] ||
                insufficientBalance ||
                !isPairApproved
              : !removeInputValue || lpBalanceInsufficient
          }
          onClick={isAddLiquidity ? handleAddLiquidity : handleRemoveLiquidity}
        >
          {isAddLiquidity ? (
            <>
              {insufficientBalance ? (
                <>
                  Insufficient{" "}
                  {token0BalanceInsufficient
                    ? pair.token0.symbol
                    : pair.token1.symbol}{" "}
                  Balance
                </>
              ) : (
                <>
                  {addInputValues[0] && addInputValues[1]
                    ? "Add Liquidity"
                    : "Enter an Amount"}
                </>
              )}
            </>
          ) : (
            <>
              {lpBalanceInsufficient
                ? "Insufficient Balance"
                : removeInputValue > 0
                ? "Remove Liquidity"
                : "Enter an Amount"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

const Stake = () => {
  const [isStake, setIsStake] = React.useState(true);

  return (
    <div className="flex flex-1 items-center justify-center p-6 lg:p-8">
      <div className="flex max-w-xl flex-1 flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <span
            className={cn(
              isStake && "text-gray-500",
              "text-[0.6rem] font-bold uppercase sm:text-base"
            )}
          >
            Unstake
          </span>
          <Switch
            checked={isStake}
            onChange={setIsStake}
            className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full ring-offset-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <span className="sr-only">
              {isStake ? "Remove Liquidity" : "Add Liquidity"}
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute h-full w-full rounded-md bg-gray-800"
            />
            <span
              aria-hidden="true"
              className={cn(
                isStake ? "bg-[#E5003E]" : "bg-gray-200",
                "pointer-events-none absolute mx-auto h-2.5 w-8 rounded-full transition-colors duration-200 ease-in-out"
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                isStake ? "translate-x-5" : "translate-x-0",
                "pointer-events-none absolute left-0 inline-block h-4 w-4 transform rounded-full border border-[#FF4E7E] bg-[#FF4E7E] shadow ring-0 transition-transform duration-200 ease-in-out"
              )}
            />
          </Switch>
          <span
            className={cn(
              !isStake && "text-gray-500",
              "text-[0.6rem] font-bold uppercase sm:text-base"
            )}
          >
            Stake
          </span>
        </div>
        <div className="flex justify-around space-x-3 sm:block">
          <button className="rounded-md bg-gray-900 py-2.5 px-3.5 text-[0.6rem] font-medium text-white ring-offset-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-xs">
            25%
          </button>
          <button className="rounded-md bg-gray-900 py-2.5 px-3.5 text-[0.6rem] font-medium text-white ring-offset-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-xs">
            50%
          </button>
          <button className="rounded-md bg-gray-900 py-2.5 px-3.5 text-[0.6rem] font-medium text-white ring-offset-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-xs">
            75%
          </button>
          <button className="rounded-md bg-gray-900 py-2.5 px-3.5 text-[0.6rem] font-medium text-white ring-offset-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-xs">
            100%
          </button>
        </div>
        <TokenInput
          id="stakeLp"
          label="LP Amount"
          tokenSymbol="SLP"
          price={0}
          balance={0}
          value={0}
          onChange={() => {
            console.warn("Not implemented");
          }}
        />
        <Button>{isStake ? "Stake" : "Unstake"}</Button>
      </div>
    </div>
  );
};

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
