import { Switch } from "@headlessui/react";
import { CogIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useParams,
  useRouteError,
  useSearchParams,
} from "@remix-run/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import invariant from "tiny-invariant";
import type { TransactionReceipt } from "viem";

import { AdvancedSettingsPopoverContent } from "~/components/AdvancedSettingsPopoverContent";
import { Button } from "~/components/Button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/Popover";
import { ToastContent } from "~/components/ToastContent";
import TokenInput from "~/components/TokenInput";
import { TransactionLink } from "~/components/TransactionLink";
import { usePrice } from "~/context/priceContext";
import { useUser } from "~/context/userContext";
import { useAddLiquidity } from "~/hooks/useAddLiquidity";
import { usePairApproval, useTokenApproval } from "~/hooks/useApproval";
import { usePair } from "~/hooks/usePair";
import { useQuote } from "~/hooks/useQuote";
import { useRemoveLiquidity } from "~/hooks/useRemoveLiquidity";
import { useAddressBalance, useTokenBalance } from "~/hooks/useTokenBalance";
import type { Pair } from "~/types";
import { createMetaTags } from "~/utils/meta";
import {
  formatBigIntOutput,
  formatCurrency,
  formatUsdLong,
  toBigInt,
  toNumber,
} from "~/utils/number";
import { getPairById } from "~/utils/pair.server";
import { getLpTokenCount, getTokenCount } from "~/utils/price";

type LoaderData = {
  pair: Pair;
};

const tabs = [
  { name: "Liquidity", query: "liquidity" },
  // { name: "Stake", query: "stake" },
  // { name: "Rewards", query: "rewards" },
] as const;

export const meta: MetaFunction<typeof loader> = ({ data }) =>
  createMetaTags(`${data.pair.name} - Manage | Magicswap`);

export const loader: LoaderFunction = async ({ params: { poolId } }) => {
  invariant(poolId, `poolId is required`);

  const pair = await getPairById(poolId);

  if (!pair) {
    throw new Response("Pool not found", {
      status: 404,
    });
  }

  return json<LoaderData>({ pair });
};

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
                  "flex-1 whitespace-nowrap border-t-2 px-4 py-3 text-center text-xs font-medium sm:flex-none sm:px-8 sm:py-4 sm:text-left sm:text-sm",
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
    toBigInt(addInput.value && addInput.value !== "." ? addInput.value : "0"),
    addInput.isExactToken0,
  );

  const removeAmount =
    removeInput && removeInput !== "." ? toBigInt(removeInput) : 0n;
  const removeEstimate = {
    token0:
      removeAmount > 0
        ? getTokenCount(
            toNumber(removeAmount),
            pair.token0.reserve,
            pair.totalSupply,
          )
        : 0,
    token1:
      removeAmount > 0
        ? getTokenCount(
            toNumber(removeAmount),
            pair.token1.reserve,
            pair.totalSupply,
          )
        : 0,
  };

  const { value: token0Balance, refetch: refetchPair0 } = useTokenBalance(
    pair.token0,
  );
  const { value: token1Balance, refetch: refetchPair1 } = useTokenBalance(
    pair.token1,
  );
  const { value: lpBalance, refetch: refetchLp } = useAddressBalance(pair.id);

  const refetchAll = useCallback(async () => {
    Promise.all([refetchPair0(), refetchPair1(), refetchLp()]);
  }, [refetchLp, refetchPair0, refetchPair1]);

  const resetInputs = useCallback(() => {
    setAddInput({ value: "", isExactToken0: false });
    setRemoveInput("");
    refetchAll();
  }, [refetchAll]);

  const {
    isApproved: isToken0Approved,
    approve: approveToken0,
    isLoading: isLoadingToken0,
    refetch: refetchToken0ApprovalStatus,
  } = useTokenApproval({
    token: pair.token0,
    amount: addAmount.token0,
    onSuccess: () => {
      refetchTokensApprovalStatus();
    },
  });

  const {
    isApproved: isToken1Approved,
    approve: approveToken1,
    isLoading: isLoadingToken1,
    refetch: refetchToken1ApprovalStatus,
  } = useTokenApproval({
    token: pair.token1,
    amount: addAmount.token1,
    onSuccess: () => {
      refetchTokensApprovalStatus();
    },
  });

  const {
    isApproved: isLpApproved,
    approve: approveLp,
    isLoading: isLoadingLp,
    refetch: refetchLpApprovalStatus,
  } = usePairApproval({
    pair,
    amount: removeAmount,
    onSuccess: () => {
      refetchTokensApprovalStatus();
    },
  });

  const { addLiquidity, isLoading: isAddLoading } = useAddLiquidity({
    pair,
    token0Amount: addAmount.token0,
    token1Amount: addAmount.token1,
    enabled: isToken0Approved && isToken1Approved,
    onSuccess: useCallback(
      (txReceipt: TransactionReceipt | undefined) => {
        toast.success(
          <ToastContent
            title="Liquidity added"
            message={<TransactionLink txHash={txReceipt?.transactionHash} />}
          />,
        );
        resetInputs();
      },
      [resetInputs],
    ),
  });

  const { removeLiquidity, isLoading: isRemoveLoading } = useRemoveLiquidity({
    pair,
    amount: removeAmount,
    token0Amount: toBigInt(removeEstimate.token0, pair.token0.decimals),
    token1Amount: toBigInt(removeEstimate.token1, pair.token1.decimals),
    onSuccess: useCallback(
      (txReceipt: TransactionReceipt | undefined) => {
        toast.success(
          <ToastContent
            title="Liquidity removed"
            message={<TransactionLink txHash={txReceipt?.transactionHash} />}
          />,
        );
        resetInputs();
      },
      [resetInputs],
    ),
  });

  const token0BalanceInsufficient = token0Balance < addAmount.token0;
  const token1BalanceInsufficient = token1Balance < addAmount.token1;
  const insufficientBalance =
    token0BalanceInsufficient || token1BalanceInsufficient;
  const lpBalanceInsufficient = lpBalance < removeAmount;

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
    resetInputs();
  }, [pair.id, resetInputs]);

  return (
    <div className="flex flex-1 items-center justify-center p-6 lg:p-8">
      <div className="flex max-w-xl flex-1 flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span
              className={twMerge(
                isAddLiquidity && "text-night-500",
                "text-[0.6rem] font-bold uppercase sm:text-base",
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
                  "pointer-events-none absolute mx-auto h-2.5 w-8 rounded-full transition-colors duration-200 ease-in-out",
                )}
              />
              <span
                aria-hidden="true"
                className={twMerge(
                  isAddLiquidity ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none absolute left-0 inline-block h-4 w-4 transform rounded-full border border-ruby-700 bg-ruby-700 shadow ring-0 transition-transform duration-200 ease-in-out",
                )}
              />
            </Switch>
            <span
              className={twMerge(
                !isAddLiquidity && "text-night-500",
                "text-[0.6rem] font-bold uppercase sm:text-base",
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
                  : formatBigIntOutput(addAmount.token0, pair.token0.decimals)
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
                  ? formatBigIntOutput(addAmount.token1, pair.token1.decimals)
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
                    pair.totalSupply,
                  ),
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
                    removeEstimate.token0 * pair.token0.priceMagic * magicUsd,
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
                    removeEstimate.token1 * pair.token1.priceMagic * magicUsd,
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        {isAddLiquidity ? (
          <>
            {addAmount.token0 > 0 &&
              addAmount.token1 > 0 &&
              (!isToken0Approved || !isToken1Approved) &&
              !insufficientBalance &&
              isConnected && (
                <Button
                  disabled={isLoadingToken0 || isLoadingToken1}
                  onClick={() =>
                    isToken0Approved ? approveToken1?.() : approveToken0?.()
                  }
                >
                  {isLoadingToken0 || isLoadingToken1
                    ? `Approving ${
                        isLoadingToken0
                          ? pair.token0.symbol
                          : pair.token1.symbol
                      }...`
                    : `Approve ${
                        isToken0Approved
                          ? pair.token1.symbol
                          : pair.token0.symbol
                      }`}
                </Button>
              )}
            <Button
              disabled={
                addAmount.token0 === 0n ||
                addAmount.token1 === 0n ||
                insufficientBalance ||
                !isToken0Approved ||
                !isToken1Approved ||
                isAddLoading
              }
              onClick={() => addLiquidity?.()}
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
                  {addAmount.token0 > 0 && addAmount.token1 > 0
                    ? "Add Liquidity"
                    : "Enter an Amount"}
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            {removeAmount > 0 &&
              !isLpApproved &&
              !lpBalanceInsufficient &&
              isConnected && (
                <Button disabled={isLoadingLp} onClick={() => approveLp?.()}>
                  {isLoadingLp
                    ? "Approving LP Token..."
                    : `Approve ${pair.name} LP Token`}
                </Button>
              )}
            <Button
              disabled={
                (isConnected &&
                  (removeAmount === 0n ||
                    lpBalanceInsufficient ||
                    !isLpApproved)) ||
                isRemoveLoading
              }
              onClick={() => removeLiquidity?.()}
              requiresConnect
            >
              {isRemoveLoading
                ? "Removing Liquidity..."
                : lpBalanceInsufficient
                  ? "Insufficient LP Token Balance"
                  : removeAmount > 0
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

export function ErrorBoundary() {
  const error = useRouteError();
  const params = useParams();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-[0.6rem] text-night-500 sm:text-base">
          {params.poolId} not found.
        </p>
      </div>
    );
  }

  throw new Error(`Unhandled error: ${error}`);
}
