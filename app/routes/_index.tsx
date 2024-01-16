import { Dialog } from "@headlessui/react";
import {
  CogIcon,
  DocumentCheckIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { ArrowDownIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import type { ServerRuntimeMetaArgs } from "@remix-run/server-runtime";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import type { TransactionReceipt } from "viem";

import { AdvancedSettingsPopoverContent } from "~/components/AdvancedSettingsPopoverContent";
import { Button } from "~/components/Button";
import { Modal } from "~/components/Modal";
import PairTokenInput from "~/components/PairTokenInput";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/Popover";
import { SwapRoutePanel } from "~/components/SwapRoutePanel";
import { ToastContent } from "~/components/ToastContent";
import { TokenLogo } from "~/components/TokenLogo";
import { TransactionLink } from "~/components/TransactionLink";
import { usePairs } from "~/context/pairs";
import { useTokenApproval } from "~/hooks/useApproval";
import { useBlockExplorer } from "~/hooks/useBlockExplorer";
import { useSwap } from "~/hooks/useSwap";
import { type SwapRoute, useSwapRoute } from "~/hooks/useSwapRoute";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import type { PairToken } from "~/types";
import { getLastPairCookie, saveLastPairCookie } from "~/utils/cookie.server";
import { createMetaTags } from "~/utils/meta";
import { formatBigIntInput, formatBigIntOutput } from "~/utils/number";
import { getTokenBySymbol } from "~/utils/tokens";

export const meta = ({
  data,
  location,
}: ServerRuntimeMetaArgs<typeof loader>) => {
  if (!data?.inputSymbol || !data.outputSymbol) {
    return createMetaTags("404 | Magicswap");
  }

  if (location.search) {
    return createMetaTags(
      `Swap ${data.inputSymbol} to ${data.outputSymbol} | Magicswap`,
    );
  }

  return createMetaTags();
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const cookie = await getLastPairCookie(request);
  const inputSymbol = url.searchParams.get("input") ?? cookie?.input ?? "MAGIC";
  const outputSymbol =
    url.searchParams.get("output") ?? cookie?.output ?? "ELM";
  await saveLastPairCookie({ input: inputSymbol, output: outputSymbol });
  return { inputSymbol, outputSymbol };
};

export default function Index() {
  const { inputSymbol, outputSymbol } = useLoaderData<typeof loader>();
  const { pairs, tokens } = usePairs();
  const [openTokenListModalProps, setOpenTokenListModalProps] = useState<{
    open: boolean;
    type: "input" | "output";
  }>({
    open: false,
    type: "input",
  });
  const [swapInput, setSwapInput] = useState({
    value: "",
    isExactOut: false,
  });
  const [isOpenConfirmSwapModal, setIsOpenConfirmSwapModal] = useState(false);

  const rawTokenIn = getTokenBySymbol(tokens, inputSymbol);
  const rawTokenOut = getTokenBySymbol(tokens, outputSymbol);
  if (!rawTokenIn || !rawTokenOut) {
    throw new Response(
      `${rawTokenIn ? outputSymbol : inputSymbol} token not found`,
      {
        status: 404,
      },
    );
  }

  const swapRoute = useSwapRoute({
    tokenIn: rawTokenIn,
    tokenOut: rawTokenOut,
    pools: pairs,
    amount: swapInput.value,
    isExactOut: swapInput.isExactOut,
  });

  const { amountIn, amountOut, tokenIn, tokenOut } = swapRoute;

  if (!tokenIn || !tokenOut) {
    throw new Response(
      `${tokenIn ? outputSymbol : inputSymbol} token not found`,
      {
        status: 404,
      },
    );
  }

  const { value: inputTokenBalance, refetch: refetchInputTokenBalance } =
    useTokenBalance(tokenIn);
  const { value: outputTokenBalance, refetch: refetchOutputTokenBalance } =
    useTokenBalance(tokenOut);

  // Reset inputs if swap changes
  useEffect(() => {
    setSwapInput((curr) => ({
      ...curr,
      isExactOut: !curr.isExactOut,
    }));
  }, [inputSymbol, outputSymbol]);

  const onClose = useCallback(
    () =>
      setOpenTokenListModalProps((props) => ({
        ...props,
        open: false,
      })),
    [],
  );

  const handleSwapSuccess = useCallback(
    (txReceipt: TransactionReceipt | undefined) => {
      toast.success(
        <ToastContent
          title="Swap complete"
          message={<TransactionLink txHash={txReceipt?.transactionHash} />}
        />,
      );
      setIsOpenConfirmSwapModal(false);
      setSwapInput({ value: "", isExactOut: false });
      refetchInputTokenBalance();
      refetchOutputTokenBalance();
    },
    [refetchInputTokenBalance, refetchOutputTokenBalance],
  );

  const insufficientBalance = inputTokenBalance < amountIn;

  return (
    <>
      <div className="flex flex-col items-center">
        <h2 className="mt-2 font-bold sm:mt-4 sm:text-lg">
          Swap {inputSymbol} to {outputSymbol}
        </h2>
        <p className="text-sm text-night-500 sm:text-base">
          The gateway to the cross-game economy
        </p>
        <div className="z-10 mt-4 w-full rounded-xl bg-night-700/10 p-4 shadow-glass backdrop-blur-md sm:mt-8">
          <div className="flex justify-end">
            <div className="relative inline-block text-left">
              <Popover className="relative">
                <PopoverTrigger className="group">
                  <CogIcon
                    className="h-6 w-6 text-night-200/50 group-hover:text-white"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Open adjustment settings</span>
                </PopoverTrigger>
                <PopoverContent className="absolute right-0 z-20 w-80 rounded-lg p-4 shadow-md">
                  <AdvancedSettingsPopoverContent>
                    {/* <div className="mt-4">
                      <h3 className="font-medium text-white">
                        Display Settings
                      </h3>
                      <Switch.Group
                        as="div"
                        className="mt-2 flex items-center justify-between"
                      >
                        <span className="flex flex-grow flex-col">
                          <Switch.Label
                            as="span"
                            className="text-sm text-night-200"
                            passive
                          >
                            Show price graph
                          </Switch.Label>
                          <Switch.Description
                            as="span"
                            className="text-[0.6rem] text-night-500"
                          >
                            Show a graph of the token price over time
                          </Switch.Description>
                        </span>
                        <Switch
                          checked={showGraph}
                          onChange={setShowGraph}
                          className={cn(
                            showGraph ? "bg-ruby-900" : "bg-night-400",
                            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ruby-500 focus:ring-offset-2"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              showGraph ? "translate-x-5" : "translate-x-0",
                              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                            )}
                          />
                        </Switch>
                      </Switch.Group>
                    </div> */}
                  </AdvancedSettingsPopoverContent>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="mt-2.5 flex flex-col xl:flex-row">
            <PairTokenInput
              id="inputToken"
              label={`${tokenIn.symbol} Amount`}
              token={tokenIn}
              balance={inputTokenBalance}
              value={
                swapInput.isExactOut
                  ? formatBigIntOutput(amountIn, tokenIn.decimals)
                  : swapInput.value
              }
              onChange={(value) => setSwapInput({ value, isExactOut: false })}
              // showPriceGraph={showGraph}
              onTokenClick={() =>
                setOpenTokenListModalProps({
                  open: true,
                  type: "input",
                })
              }
            />
            <div className="flex basis-10 items-center justify-center sm:basis-16 xl:basis-32">
              <Link
                to={`/?input=${tokenOut.symbol}&output=${tokenIn.symbol}`}
                className="group rounded-full p-2 transition duration-300 ease-in-out hover:bg-night-500/20"
              >
                <ArrowRightIcon className="hidden h-6 w-6 animate-rotate-back text-night-500 group-hover:animate-rotate-180 xl:block" />
                <ArrowDownIcon className="block h-5 w-5 animate-rotate-back text-night-500 group-hover:animate-rotate-180 xl:hidden" />
              </Link>
            </div>
            <PairTokenInput
              id="outputToken"
              label={`${tokenOut.symbol} Amount`}
              token={tokenOut}
              balance={outputTokenBalance}
              value={
                swapInput.isExactOut
                  ? swapInput.value
                  : formatBigIntOutput(amountOut, tokenOut.decimals)
              }
              onChange={(value) => setSwapInput({ value, isExactOut: true })}
              // showPriceGraph={showGraph}
              onTokenClick={() =>
                setOpenTokenListModalProps({
                  open: true,
                  type: "output",
                })
              }
            />
          </div>
        </div>
        <div className="mt-4 w-full space-y-6 px-0 sm:mt-8 xl:px-72 2xl:mt-12">
          <Button
            disabled={
              amountIn === 0n || amountOut === 0n || insufficientBalance
            }
            onClick={() => setIsOpenConfirmSwapModal(true)}
            requiresConnect
          >
            {insufficientBalance
              ? "Insufficient Balance"
              : amountIn > 0 && amountOut
                ? "Swap"
                : "Enter an Amount"}
          </Button>
          <SwapRoutePanel {...swapRoute} />
        </div>
      </div>
      <TokenSelectionModal
        modalProps={openTokenListModalProps}
        onClose={onClose}
      />
      <ConfirmSwapModal
        {...swapRoute}
        tokenIn={tokenIn}
        tokenOut={tokenOut}
        isExactOut={swapInput.isExactOut}
        isOpen={isOpenConfirmSwapModal}
        onClose={() => setIsOpenConfirmSwapModal(false)}
        onSuccess={handleSwapSuccess}
      />
    </>
  );
}

const ConfirmSwapModal = ({
  isExactOut,
  isOpen,
  onClose,
  onSuccess,
  ...swapRoute
}: Omit<SwapRoute, "tokenIn" | "tokenOut"> & {
  tokenIn: PairToken;
  tokenOut: PairToken;
  isExactOut: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (txReceipt: TransactionReceipt | undefined) => void;
}) => {
  const { tokenIn, tokenOut, amountIn, amountOut, path } = swapRoute;

  const {
    isApproved,
    approve,
    isLoading: isApproveLoading,
    refetch: refetchTokenApprovalStatus,
  } = useTokenApproval({
    token: tokenIn,
    amount: amountIn,
    onSuccess: () => {
      refetchTokenApprovalStatus();
    },
  });

  const {
    amountIn: worstAmountIn,
    amountOut: worstAmountOut,
    swap,
    isLoading,
  } = useSwap({
    path,
    amountIn: amountIn,
    amountOut: amountOut,
    isExactOut,
    enabled: isApproved,
    onSuccess,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-night-200"
        >
          Confirm Swap
        </Dialog.Title>
        <div className="mb-4 mt-4 flex flex-col items-center">
          <div className="flex w-full justify-between rounded-md bg-night-900 p-4">
            <span className="truncate text-lg font-medium tracking-wide">
              {isExactOut
                ? formatBigIntOutput(amountIn, tokenIn.decimals)
                : formatBigIntInput(amountIn)}
            </span>
            <div className="flex flex-shrink-0 items-center space-x-2 pl-2">
              <TokenLogo token={tokenIn} className="h-5 w-5 rounded-full" />
              <span className="text-sm font-medium">{tokenIn.symbol}</span>
            </div>
          </div>
          <div className="z-10 -my-3 rounded-full border border-night-900 bg-night-800 p-1">
            <ArrowDownIcon className="h-6 w-6 text-night-500" />
          </div>
          <div className="flex w-full justify-between rounded-md bg-night-900 p-4">
            <span className="text-lg font-medium tracking-wide">
              {isExactOut
                ? formatBigIntInput(amountOut)
                : formatBigIntOutput(amountOut, tokenOut.decimals)}
            </span>
            <div className="flex items-center space-x-2 pl-2">
              <TokenLogo token={tokenOut} className="h-5 w-5 rounded-full" />
              <span className="text-sm font-medium">{tokenOut.symbol}</span>
            </div>
          </div>
        </div>
        <SwapRoutePanel {...swapRoute} hideDerivedValue />
        <div className="mt-4">
          <div className="my-4 space-y-1">
            {isExactOut ? (
              <>
                <p className="text-xs text-night-400">
                  Input is estimated. You will sell at most:
                </p>
                <p className="text-sm">
                  {formatBigIntOutput(worstAmountIn)}{" "}
                  <span className="text-night-300">{tokenIn.symbol}</span>
                </p>
                <p className="text-xs text-night-400">
                  or the transaction will revert.
                </p>
              </>
            ) : (
              <>
                <p className="text-xs text-night-400">
                  Output is estimated. You will receieve at least:
                </p>
                <p className="text-sm">
                  {formatBigIntOutput(worstAmountOut)}{" "}
                  <span className="text-night-300">{tokenOut.symbol}</span>
                </p>
                <p className="text-xs text-night-400">
                  or the transaction will revert.
                </p>
              </>
            )}
          </div>
          <Button
            disabled={isLoading || isApproveLoading}
            onClick={() => {
              if (!isApproved) {
                approve?.();
              } else {
                swap?.();
              }
            }}
          >
            {isApproved
              ? isLoading
                ? "Swapping..."
                : "Confirm Swap"
              : isApproveLoading
                ? `Approving ${tokenIn.symbol}...`
                : `Approve ${tokenIn.symbol}`}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const TokenSelectionModal = ({
  modalProps,
  onClose,
}: {
  modalProps: {
    open: boolean;
    type: "input" | "output";
  };
  onClose: () => void;
}) => {
  const { type } = modalProps;
  const { inputSymbol, outputSymbol } = useLoaderData<typeof loader>();
  const location = useLocation();
  const [searchString, setSearchString] = useState("");
  const blockExplorer = useBlockExplorer();

  const { tokens } = usePairs();

  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchString.toLowerCase()) ||
      token.name.toLowerCase().includes(searchString.toLowerCase()),
  );

  const currentToken = type === "input" ? inputSymbol : outputSymbol;
  const otherToken = type === "input" ? outputSymbol : inputSymbol;

  useEffect(() => {
    onClose();
    setSearchString("");
  }, [location.search, onClose]);

  return (
    <Modal isOpen={modalProps.open} onClose={onClose}>
      <div>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-night-200"
        >
          Select a Token
        </Dialog.Title>
        <div className="mt-3">
          <label htmlFor="search-token" className="sr-only">
            Search Token
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="search-token"
              id="search-token"
              onChange={(e) => setSearchString(e.currentTarget.value)}
              value={searchString}
              className="block w-full rounded-md border-night-700 bg-night-900 pr-10 focus:border-night-500 focus:ring-night-500 sm:text-sm"
              placeholder="Search token"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-night-700"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <ul className="mt-2 h-80 overflow-auto rounded-md border border-night-700 bg-night-900">
          {filteredTokens.map((token) => {
            const isDisabled =
              token.symbol === currentToken || token.symbol === otherToken;
            return (
              <li key={token.id}>
                <Link
                  prefetch="intent"
                  to={`/?input=${
                    type === "input" ? token.symbol : otherToken
                  }&output=${type === "output" ? token.symbol : otherToken}`}
                  className={twMerge(
                    "flex items-center justify-between gap-3 px-6 py-5 transition duration-150 ease-in-out focus-within:ring-2 focus-within:ring-inset focus-within:ring-ruby-500",
                    isDisabled
                      ? "pointer-events-none opacity-20"
                      : "hover:bg-night-800/40",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <TokenLogo
                      token={token}
                      className="h-10 w-10 shrink-0 rounded-full"
                    />
                    <div className="grow">
                      <p className="truncate text-sm text-night-200">
                        {token.symbol}
                      </p>
                      {token.name !== token.symbol ? (
                        <p className="text-xs font-medium text-night-500">
                          {token.name}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <a
                    href={`${blockExplorer.url}/address/${token.id}`}
                    title={`View ${token.symbol} on ${blockExplorer.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-night-300 transition-colors hover:text-night-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DocumentCheckIcon className="h-4 w-4" />
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
};

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-[0.6rem] text-night-500 sm:text-base">
          {error.data.message}
        </p>
      </div>
    );
  }

  throw new Error(`Unhandled error: ${error}`);
}
