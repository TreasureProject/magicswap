import { useCallback, useEffect, useState } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { ShouldReloadFunction } from "@remix-run/react";
import { useCatch, useLoaderData } from "@remix-run/react";
import { PlusIcon } from "@heroicons/react/solid";
import { Link, useParams, useSearchParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Button } from "~/components/Button";
import { Switch } from "@headlessui/react";
import { getLpTokenCount, getTokenCount } from "~/utils/price";
import {
  formatBigNumberOutput,
  formatCurrency,
  formatUsdLong,
  toBigNumber,
  toNumber,
} from "~/utils/number";
import { getPairById } from "~/utils/pair.server";
import type { Pair } from "~/types";
import { useAddressBalance, useTokenBalance } from "~/hooks/useTokenBalance";
import { useAddLiquidity, useRemoveLiquidity } from "~/hooks/useLiquidity";
import TokenInput from "~/components/TokenInput";
import { usePairApproval, useTokenApproval } from "~/hooks/useApproval";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/Popover";
import { CogIcon } from "@heroicons/react/outline";
import { useUser } from "~/context/userContext";
import { AdvancedSettingsPopoverContent } from "~/components/AdvancedSettingsPopoverContent";
import { usePair } from "~/hooks/usePair";
import { usePrice } from "~/context/priceContext";
import { createMetaTags } from "~/utils/meta";
import { useQuote } from "~/hooks/useQuote";
import { twMerge } from "tailwind-merge";
import { Zero } from "@ethersproject/constants";

type LoaderData = {
  pair: Pair;
};

const tabs = [
  { name: "Liquidity", query: "liquidity" },
  // { name: "Stake", query: "stake" },
  // { name: "Rewards", query: "rewards" },
] as const;

export const meta: MetaFunction = ({ data }: { data: LoaderData }) =>
  createMetaTags(`${data.pair.name} - Manage | MagicSwap`);

export const loader: LoaderFunction = async ({ params: { poolId } }) => {
  invariant(poolId, `poolId is required`);

  const pair = await getPairById(poolId, process.env.EXCHANGE_ENDPOINT);

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
    <div className="flex h-full flex-col rounded-md border border-night-800 bg-[#131D2E]">
      <div className="border-b border-night-700">
        <nav className="-mb-px flex" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = tab.name === selectedTab.name;
            return (
              <Link
                key={tab.name}
                to={`/pools/${params.poolId}/manage?tab=${tab.query}`}
                className={twMerge(
                  isActive
                    ? "border-ruby-500 bg-night-500/20 text-white"
                    : "border-transparent text-night-500 hover:border-night-300 hover:text-night-700",
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
  const [isAddLiquidity, setIsAddLiquidity] = useState(true);
  const [addInput, setAddInput] = useState({
    value: "",
    isExactToken0: false,
  });
  const [removeInput, setRemoveInput] = useState("");
  const data = useLoaderData<LoaderData>();
  const { isConnected } = useUser();
  const pair = usePair(data.pair);
  const { magicUsd } = usePrice();

  const addAmount = useQuote(
    pair.token0,
    pair.token1,
    toBigNumber(
      addInput.value && addInput.value !== "." ? addInput.value : "0"
    ),
    addInput.isExactToken0
  );

  const { value: token0Balance, refetch: refetchPair0 } = useTokenBalance(
    pair.token0
  );
  const { value: token1Balance, refetch: refetchPair1 } = useTokenBalance(
    pair.token1
  );
  const { value: lpBalance, refetch: refetchLp } = useAddressBalance(pair.id);
  const {
    isApproved: isToken0Approved,
    approve: approveToken0,
    isLoading: isLoadingToken0,
    isSuccess: isSuccessToken0,
    refetch: refetchToken0ApprovalStatus,
  } = useTokenApproval(pair.token0, addAmount.token0);
  const {
    isApproved: isToken1Approved,
    approve: approveToken1,
    isLoading: isLoadingToken1,
    isSuccess: isSuccessToken1,
    refetch: refetchToken1ApprovalStatus,
  } = useTokenApproval(pair.token1, addAmount.token1);
  const {
    isApproved: isLpApproved,
    approve: approveLp,
    isLoading: isLoadingLp,
    isSuccess: isSuccessLp,
    refetch: refetchLpApprovalStatus,
  } = usePairApproval(pair);
  const {
    addLiquidity,
    isSuccess: isAddSuccess,
    isLoading: isAddLoading,
  } = useAddLiquidity();
  const {
    removeLiquidity,
    isSuccess: isRemoveSuccess,
    isLoading: isRemoveLoading,
  } = useRemoveLiquidity();

  const removeAmount =
    removeInput && removeInput !== "." ? toBigNumber(removeInput) : Zero;
  const removeEstimate = {
    token0: removeAmount.gt(Zero)
      ? getTokenCount(
          toNumber(removeAmount),
          pair.token0.reserve,
          pair.totalSupply
        )
      : 0,
    token1: removeAmount.gt(Zero)
      ? getTokenCount(
          toNumber(removeAmount),
          pair.token1.reserve,
          pair.totalSupply
        )
      : 0,
  };

  const token0BalanceInsufficient = token0Balance.lt(addAmount.token0);
  const token1BalanceInsufficient = token1Balance.lt(addAmount.token1);
  const insufficientBalance =
    token0BalanceInsufficient || token1BalanceInsufficient;
  const lpBalanceInsufficient = lpBalance.lt(removeAmount);

  const refetchAll = useCallback(async () => {
    Promise.all([refetchPair0(), refetchPair1(), refetchLp()]);
  }, [refetchLp, refetchPair0, refetchPair1]);

  const refetchTokensApprovalStatus = useCallback(async () => {
    Promise.all([
      refetchToken0ApprovalStatus(),
      refetchToken1ApprovalStatus(),
      refetchLpApprovalStatus(),
    ]);
  }, [
    refetchLpApprovalStatus,
    refetchToken0ApprovalStatus,
    refetchToken1ApprovalStatus,
  ]);

  useEffect(() => {
    if (isSuccessToken0 || isSuccessToken1 || isSuccessLp) {
      refetchTokensApprovalStatus();
    }
  }, [
    isSuccessLp,
    isSuccessToken0,
    isSuccessToken1,
    refetchTokensApprovalStatus,
  ]);

  const resetInputs = useCallback(() => {
    setAddInput({ value: "", isExactToken0: false });
    setRemoveInput("");
    refetchAll();
  }, [refetchAll]);

  useEffect(() => {
    if (isAddSuccess || isRemoveSuccess) {
      resetInputs();
    }
  }, [isAddSuccess, isRemoveSuccess, resetInputs]);

  useEffect(() => {
    resetInputs();
  }, [pair.id, resetInputs]);

  const handleAddLiquidity = () => {
    addLiquidity(pair, addAmount.token0, addAmount.token1);
  };

  const handleRemoveLiquidity = () => {
    removeLiquidity(
      pair,
      removeAmount,
      removeEstimate.token0,
      removeEstimate.token1
    );
  };

  return (
    <div className="flex flex-1 items-center justify-center p-6 lg:p-8">
      <div className="flex max-w-xl flex-1 flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span
              className={twMerge(
                isAddLiquidity && "text-night-500",
                "text-[0.6rem] font-bold uppercase sm:text-base"
              )}
            >
              Remove Liquidity
            </span>
            <Switch
              checked={isAddLiquidity}
              onChange={setIsAddLiquidity}
              className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full ring-offset-night-800 focus:outline-none focus:ring-2 focus:ring-ruby-500 focus:ring-offset-2"
            >
              <span className="sr-only">
                {isAddLiquidity ? "Remove Liquidity" : "Add Liquidity"}
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute h-full w-full rounded-md bg-night-900"
              />
              <span
                aria-hidden="true"
                className={twMerge(
                  isAddLiquidity ? "bg-ruby-900" : "bg-night-200",
                  "pointer-events-none absolute mx-auto h-2.5 w-8 rounded-full transition-colors duration-200 ease-in-out"
                )}
              />
              <span
                aria-hidden="true"
                className={twMerge(
                  isAddLiquidity ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none absolute left-0 inline-block h-4 w-4 transform rounded-full border border-ruby-700 bg-ruby-700 shadow ring-0 transition-transform duration-200 ease-in-out"
                )}
              />
            </Switch>
            <span
              className={twMerge(
                !isAddLiquidity && "text-night-500",
                "text-[0.6rem] font-bold uppercase sm:text-base"
              )}
            >
              Add Liquidity
            </span>
          </div>
          <Popover className="relative">
            <PopoverTrigger className="group">
              <CogIcon
                className="h-6 w-6 text-night-200/50 group-hover:text-white"
                aria-hidden="true"
              />
              <span className="sr-only">Open adjustment settings</span>
            </PopoverTrigger>
            <PopoverContent className="absolute right-0 z-10 w-80 rounded-lg p-4 shadow-md">
              <AdvancedSettingsPopoverContent />
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
              value={
                addInput.isExactToken0
                  ? addInput.value
                  : formatBigNumberOutput(
                      addAmount.token0,
                      pair.token0.decimals
                    )
              }
              onChange={(value) => setAddInput({ value, isExactToken0: true })}
            />
            <div className="flex justify-center">
              <PlusIcon className="h-4 w-4 text-night-400" />
            </div>
            <TokenInput
              id="addLiquidityToken1"
              label={`${pair.token1.symbol} Amount`}
              token={pair.token1}
              balance={token1Balance}
              value={
                addInput.isExactToken0
                  ? formatBigNumberOutput(
                      addAmount.token1,
                      pair.token1.decimals
                    )
                  : addInput.value
              }
              onChange={(value) => setAddInput({ value, isExactToken0: false })}
            />
            <div className="space-y-2 rounded-md bg-night-900 p-4">
              <p className="text-xs text-night-600 sm:text-base">
                You'll receive (at least):
              </p>
              <p className="text-sm font-medium sm:text-lg">
                ≈{" "}
                {formatCurrency(
                  getLpTokenCount(
                    toNumber(addAmount.token0),
                    pair.token0.reserve,
                    pair.totalSupply
                  )
                )}{" "}
                {pair.name} Pool Tokens
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <TokenInput
              id="removeLiquidity"
              label="Amount"
              tokenSymbol={`${pair.name} LP`}
              price={pair.lpPriceMagic * magicUsd}
              balance={lpBalance}
              value={removeInput}
              onChange={setRemoveInput}
            />
            <div className="space-y-2 rounded-md bg-night-900 p-4">
              <p className="text-xs text-night-600 sm:text-base">
                You'll receive (at least):
              </p>
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {formatCurrency(removeEstimate.token0)} {pair.token0.symbol}
                </span>
                <span className="text-night-200">
                  ≈{" "}
                  {formatUsdLong(
                    removeEstimate.token0 * pair.token0.priceMagic * magicUsd
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {formatCurrency(removeEstimate.token1)} {pair.token1.symbol}
                </span>
                <span className="text-night-200">
                  ={" "}
                  {formatUsdLong(
                    removeEstimate.token1 * pair.token1.priceMagic * magicUsd
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        {isAddLiquidity ? (
          <>
            {addAmount.token0.gt(Zero) &&
              addAmount.token1.gt(Zero) &&
              (!isToken0Approved || !isToken1Approved) &&
              !insufficientBalance &&
              isConnected && (
                <Button
                  disabled={isLoadingToken0 || isLoadingToken1}
                  onClick={() =>
                    isToken0Approved ? approveToken1() : approveToken0()
                  }
                >
                  {isLoadingToken0 || isLoadingToken1
                    ? "Approving Token..."
                    : `Approve ${
                        isToken0Approved
                          ? pair.token1.symbol
                          : pair.token0.symbol
                      }`}
                </Button>
              )}
            <Button
              disabled={
                addAmount.token0.eq(Zero) ||
                addAmount.token1.eq(Zero) ||
                insufficientBalance ||
                !isToken0Approved ||
                !isToken1Approved ||
                isAddLoading
              }
              onClick={handleAddLiquidity}
              requiresConnect
            >
              {isAddLoading ? (
                "Adding Liquidity..."
              ) : insufficientBalance ? (
                <>
                  Insufficient{" "}
                  {token0BalanceInsufficient
                    ? pair.token0.symbol
                    : pair.token1.symbol}{" "}
                  Balance
                </>
              ) : (
                <>
                  {addAmount.token0.gt(Zero) && addAmount.token1.gt(Zero)
                    ? "Add Liquidity"
                    : "Enter an Amount"}
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            {removeAmount.gt(Zero) &&
              !isLpApproved &&
              !lpBalanceInsufficient &&
              isConnected && (
                <Button disabled={isLoadingLp} onClick={() => approveLp()}>
                  {isLoadingLp
                    ? "Approving LP..."
                    : `Approve ${pair.name} LP Token`}
                </Button>
              )}
            <Button
              disabled={
                (isConnected &&
                  (removeAmount.eq(Zero) ||
                    lpBalanceInsufficient ||
                    !isLpApproved)) ||
                isRemoveLoading
              }
              onClick={handleRemoveLiquidity}
              requiresConnect
            >
              {isRemoveLoading
                ? "Removing Liquidity..."
                : lpBalanceInsufficient
                ? "Insufficient LP Token Balance"
                : removeAmount.gt(Zero)
                ? "Remove Liquidity"
                : "Enter an Amount"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

// const Stake = () => {
//   const [isStake, setIsStake] = useState(true);

//   return (
//     <div className="flex flex-1 items-center justify-center p-6 lg:p-8">
//       <div className="flex max-w-xl flex-1 flex-col space-y-4">
//         <div className="flex items-center space-x-2">
//           <span
//             className={twMerge(
//               isStake && "text-night-500",
//               "text-[0.6rem] font-bold uppercase sm:text-base"
//             )}
//           >
//             Unstake
//           </span>
//           <Switch
//             checked={isStake}
//             onChange={setIsStake}
//             className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full ring-offset-night-800 focus:outline-none focus:ring-2 focus:ring-ruby-500 focus:ring-offset-2"
//           >
//             <span className="sr-only">
//               {isStake ? "Remove Liquidity" : "Add Liquidity"}
//             </span>
//             <span
//               aria-hidden="true"
//               className="pointer-events-none absolute h-full w-full rounded-md bg-night-800"
//             />
//             <span
//               aria-hidden="true"
//               className={twMerge(
//                 isStake ? "bg-ruby-900" : "bg-night-200",
//                 "pointer-events-none absolute mx-auto h-2.5 w-8 rounded-full transition-colors duration-200 ease-in-out"
//               )}
//             />
//             <span
//               aria-hidden="true"
//               className={twMerge(
//                 isStake ? "translate-x-5" : "translate-x-0",
//                 "pointer-events-none absolute left-0 inline-block h-4 w-4 transform rounded-full border border-[#FF4E7E] bg-[#FF4E7E] shadow ring-0 transition-transform duration-200 ease-in-out"
//               )}
//             />
//           </Switch>
//           <span
//             className={twMerge(
//               !isStake && "text-night-500",
//               "text-[0.6rem] font-bold uppercase sm:text-base"
//             )}
//           >
//             Stake
//           </span>
//         </div>
//         <div className="flex justify-around space-x-3 sm:block">
//           <button className="rounded-md bg-night-900 py-2.5 px-3.5 text-[0.6rem] font-medium text-white ring-offset-night-800 focus:outline-none focus:ring-2 focus:ring-night-500 focus:ring-offset-2 sm:text-xs">
//             25%
//           </button>
//           <button className="rounded-md bg-night-900 py-2.5 px-3.5 text-[0.6rem] font-medium text-white ring-offset-night-800 focus:outline-none focus:ring-2 focus:ring-night-500 focus:ring-offset-2 sm:text-xs">
//             50%
//           </button>
//           <button className="rounded-md bg-night-900 py-2.5 px-3.5 text-[0.6rem] font-medium text-white ring-offset-night-800 focus:outline-none focus:ring-2 focus:ring-night-500 focus:ring-offset-2 sm:text-xs">
//             75%
//           </button>
//           <button className="rounded-md bg-night-900 py-2.5 px-3.5 text-[0.6rem] font-medium text-white ring-offset-night-800 focus:outline-none focus:ring-2 focus:ring-night-500 focus:ring-offset-2 sm:text-xs">
//             100%
//           </button>
//         </div>
//         <TokenInput
//           id="stakeLp"
//           label="LP Amount"
//           tokenSymbol="SLP"
//           price={0}
//           balance={Zero}
//           value={"0"}
//           onChange={() => {
//             console.warn("Not implemented");
//           }}
//         />
//         <Button>{isStake ? "Stake" : "Unstake"}</Button>
//       </div>
//     </div>
//   );
// };

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
