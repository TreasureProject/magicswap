import { StarIcon } from "~/components/Icons";
import {
  ArrowRightIcon,
  ArrowDownIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import cn from "clsx";
import { Button } from "~/components/Button";
import { useCallback, useEffect } from "react";
import { Link, useCatch, useLoaderData, useLocation } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Dialog, Switch } from "@headlessui/react";
import { getTokenBySymbol, getUniqueTokens } from "~/utils/tokens.server";
import type { Pair, PairToken, Token } from "~/types";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import { getPairs } from "~/utils/pair.server";
import PairTokenInput from "~/components/PairTokenInput";
import { useState } from "react";
import { useSwap } from "~/hooks/useSwap";
import { TokenLogo } from "~/components/TokenLogo";
import { CogIcon } from "@heroicons/react/outline";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/Popover";
import { useTokenApproval } from "~/hooks/useApproval";
import { getEnvVariable } from "~/utils/env";
import useLocalStorageState from "use-local-storage-state";

import { useUser } from "~/context/userContext";
import { usePair } from "~/hooks/usePair";
import { AdvancedSettingsPopoverContent } from "~/components/AdvancedSettingsPopoverContent";
import { Modal } from "~/components/Modal";
import { useSettings } from "~/context/settingsContext";
import { formatNumber, formatPercent } from "~/utils/number";
import { LIQUIDITY_PROVIDER_FEE } from "~/utils/price";
import { WalletButton } from "~/components/Wallet";

type LoaderData = {
  pairs: Pair[];
  pair: Pair;
  tokens: Token[];
  inputToken: PairToken;
  outputToken: PairToken;
};

export const meta: MetaFunction = ({ data }) => {
  if (!data) {
    return {
      title: "Swap | Magicswap",
    };
  }

  const { inputToken, outputToken } = data as LoaderData;
  return {
    title: `Swap ${inputToken.symbol} to ${outputToken.symbol} | Magicswap`,
  };
};

export const loader: LoaderFunction = async ({ request, context }) => {
  const exchangeUrl = getEnvVariable("EXCHANGE_ENDPOINT", context);
  const url = new URL(request.url);
  const inputSymbol = url.searchParams.get("input") ?? "USDC";
  const outputSymbol = url.searchParams.get("output") ?? "MAGIC";

  const pairs = await getPairs(exchangeUrl);
  const tokens = getUniqueTokens(pairs).sort((a, b) =>
    a.symbol.localeCompare(b.symbol)
  );
  const inputToken = getTokenBySymbol(tokens, inputSymbol);
  const outputToken = getTokenBySymbol(tokens, outputSymbol);

  if (!inputToken || !outputToken) {
    throw new Response("Token not found", {
      status: 404,
    });
  }

  if (inputToken.id === outputToken.id) {
    throw new Response("Swap not allowed", {
      status: 404,
    });
  }

  const pair = pairs.find(
    ({ token0, token1 }) =>
      (token0.id === inputToken.id || token0.id === outputToken.id) &&
      (token1.id === inputToken.id || token1.id === outputToken.id)
  );

  if (!pair) {
    throw new Response("Swap not allowed", {
      status: 404,
    });
  }

  return json<LoaderData>({
    pairs,
    pair,
    tokens,
    inputToken: pair.token0.id === inputToken.id ? pair.token0 : pair.token1,
    outputToken: pair.token0.id === outputToken.id ? pair.token0 : pair.token1,
  });
};

export default function Index() {
  const data = useLoaderData<LoaderData>();
  const [openTokenListModalProps, setOpenTokenListModalProps] = useState<{
    open: boolean;
    type: "input" | "output";
  }>({
    open: false,
    type: "input",
  });
  const [isExactOut, setIsExactOut] = useState(false);
  const [inputValues, setInputValues] = useState([0, 0]);
  const inputTokenBalance = useTokenBalance(data.inputToken);
  const outputTokenBalance = useTokenBalance(data.outputToken);
  const pair = usePair(data.pair);
  const { isConnected } = useUser();
  const [showGraph, setShowGraph] = useLocalStorageState("ms:showGraph", {
    ssr: true,
    defaultValue: false,
  });
  const [isOpenConfirmSwapModal, setIsOpenConfirmSwapModal] = useState(false);
  const [priceImpact, setPriceImpact] = useState(0);

  const inputPairToken =
    pair.token0.id === data.inputToken.id ? pair.token0 : pair.token1;
  const outputPairToken =
    pair.token0.id === data.outputToken.id ? pair.token0 : pair.token1;

  const onClose = useCallback(
    () =>
      setOpenTokenListModalProps((props) => ({
        ...props,
        open: false,
      })),
    []
  );

  const handleInputChange = (value: number) => {
    setIsExactOut(false);
    const rawAmountOut = value * outputPairToken.price;
    const amountInWithFee = value * (1 - LIQUIDITY_PROVIDER_FEE);
    const amountOut = Math.max(
      (amountInWithFee * outputPairToken.reserve) /
        (inputPairToken.reserve + amountInWithFee),
      0
    );
    setPriceImpact(1 - amountOut / rawAmountOut);
    setInputValues([value, amountOut]);
  };

  const handleOutputChange = (value: number) => {
    setIsExactOut(true);
    const rawAmountIn = value * inputPairToken.price;
    const amountIn = Math.max(
      (inputPairToken.reserve * value) /
        ((outputPairToken.reserve - value) * (1 - LIQUIDITY_PROVIDER_FEE)),
      0
    );
    setPriceImpact(1 - rawAmountIn / amountIn);
    setInputValues([amountIn, value]);
  };

  // Reset inputs if swap changes
  useEffect(() => {
    setInputValues([0, 0]);
  }, [inputPairToken.id, outputPairToken.id]);

  const insufficientBalance = inputTokenBalance < inputValues[0];

  const onCloseConfirmModal = useCallback(
    () => setIsOpenConfirmSwapModal(false),
    []
  );

  return (
    <>
      <div className="flex flex-col items-center">
        <StarIcon className="h-5 w-5" />
        <h2 className="mt-4 text-sm font-bold sm:text-lg">
          Swap {inputPairToken.symbol} to {outputPairToken.symbol}
        </h2>
        <p className="text-xs text-gray-500 sm:text-base">
          The easiest way to swap your tokens
        </p>
        <div className="mt-8 w-full rounded-xl bg-gray-700/10 p-4 shadow-glass backdrop-blur-md">
          <div className="flex justify-end">
            <div className="relative inline-block text-left">
              <Popover className="relative">
                <PopoverTrigger className="group">
                  <CogIcon
                    className="h-6 w-6 text-gray-200/50 group-hover:text-white"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Open adjustment settings</span>
                </PopoverTrigger>
                <PopoverContent className="absolute right-0 z-10 w-80 rounded-lg p-4 shadow-md">
                  <AdvancedSettingsPopoverContent>
                    <div className="mt-4">
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
                            className="text-sm text-gray-200"
                            passive
                          >
                            Show price graph
                          </Switch.Label>
                          <Switch.Description
                            as="span"
                            className="text-[0.6rem] text-gray-500"
                          >
                            Show a graph of the token price over time
                          </Switch.Description>
                        </span>
                        <Switch
                          checked={showGraph}
                          onChange={setShowGraph}
                          className={cn(
                            showGraph ? "bg-[#E5003E]" : "bg-gray-400",
                            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
                    </div>
                  </AdvancedSettingsPopoverContent>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="mt-2.5 flex flex-col xl:flex-row">
            <PairTokenInput
              id="inputToken"
              label={`${inputPairToken.symbol} Amount`}
              token={inputPairToken}
              balance={inputTokenBalance}
              value={inputValues[0]}
              locked={inputPairToken.isMagic}
              onChange={handleInputChange}
              showPriceGraph={showGraph}
              onTokenClick={() =>
                setOpenTokenListModalProps({
                  open: true,
                  type: "input",
                })
              }
            />
            <div className="flex basis-24 items-center justify-center xl:basis-32">
              <Link
                to={`/?input=${outputPairToken.symbol}&output=${inputPairToken.symbol}`}
                className="group rounded-full p-2 transition duration-300 ease-in-out hover:bg-gray-500/20"
              >
                <ArrowRightIcon className="hidden h-6 w-6 animate-rotate-back text-gray-500 group-hover:animate-rotate-180 xl:block" />
                <ArrowDownIcon className="block h-6 w-6 animate-rotate-back text-gray-500 group-hover:animate-rotate-180 xl:hidden" />
              </Link>
            </div>
            <PairTokenInput
              id="outputToken"
              label={`${outputPairToken.symbol} Amount`}
              token={outputPairToken}
              balance={outputTokenBalance}
              value={inputValues[1]}
              locked={outputPairToken.isMagic}
              onChange={handleOutputChange}
              showPriceGraph={showGraph}
              onTokenClick={() =>
                setOpenTokenListModalProps({
                  open: true,
                  type: "output",
                })
              }
            />
          </div>
        </div>
        <div className="mt-8 w-full space-y-4 px-0 xl:px-72 2xl:mt-12">
          {!isConnected ? (
            <WalletButton />
          ) : (
            <Button
              disabled={
                !inputValues[0] || !inputValues[1] || insufficientBalance
              }
              onClick={() => setIsOpenConfirmSwapModal(true)}
            >
              {insufficientBalance
                ? "Insufficient Balance"
                : inputValues[0] && inputValues[1]
                ? "Swap"
                : "Enter an Amount"}
            </Button>
          )}
        </div>
      </div>
      <TokenSelectionModal
        modalProps={openTokenListModalProps}
        onClose={onClose}
      />
      <ConfirmSwapModal
        isOpen={isOpenConfirmSwapModal}
        onClose={onCloseConfirmModal}
        inputPairToken={inputPairToken}
        outputPairToken={outputPairToken}
        inputValues={inputValues}
        isExactOut={isExactOut}
        priceImpact={priceImpact}
      />
    </>
  );
}

const ConfirmSwapModal = ({
  isOpen,
  onClose,
  inputPairToken,
  outputPairToken,
  inputValues,
  isExactOut,
  priceImpact,
}: {
  isOpen: boolean;
  onClose: () => void;
  inputPairToken: Token;
  outputPairToken: Token;
  inputValues: number[];
  isExactOut: boolean;
  priceImpact: number;
}) => {
  const { swap, isLoading, isError, isSuccess } = useSwap();
  const { slippage } = useSettings();
  const { isApproved, approve } = useTokenApproval(inputPairToken);

  const worstAmountIn =
    inputValues[0] * (isExactOut ? (100 + slippage) / 100 : 1);

  const worstAmountOut =
    inputValues[1] * (isExactOut ? 1 : (100 - slippage) / 100);

  useEffect(() => {
    if (isError) {
      onClose();
    }
  }, [isError, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-200"
        >
          Confirm Swap
        </Dialog.Title>
        <div className="mt-4 mb-4 flex flex-col items-center">
          <div className="flex w-full justify-between rounded-md bg-gray-900 p-4">
            <span className="truncate text-lg font-medium tracking-wide">
              {formatNumber(inputValues[0])}
            </span>
            <div className="flex flex-shrink-0 items-center space-x-2 pl-2">
              <TokenLogo
                tokenAddress={inputPairToken.id}
                symbol={inputPairToken.symbol}
                className="h-5 w-5 rounded-full"
              />
              <span className="text-sm font-medium">
                {inputPairToken.symbol}
              </span>
            </div>
          </div>
          <div className="z-10 -my-3 rounded-full border border-gray-900 bg-gray-800 p-1">
            <ArrowDownIcon className="h-6 w-6 text-gray-500" />
          </div>
          <div className="flex w-full justify-between rounded-md bg-gray-900 p-4">
            <span className="text-lg font-medium tracking-wide">
              {formatNumber(inputValues[1])}
            </span>
            <div className="flex items-center space-x-2 pl-2">
              <TokenLogo
                tokenAddress={outputPairToken.id}
                symbol={outputPairToken.symbol}
                className="h-5 w-5 rounded-full"
              />

              <span className="text-sm font-medium">
                {outputPairToken.symbol}
              </span>
            </div>
          </div>
        </div>
        <dl className="space-y-1.5 border-t border-gray-700">
          <div className="mt-4 flex justify-between">
            <dt className="text-xs text-gray-400">Price Impact</dt>
            <dt className="text-xs text-gray-200">
              {formatPercent(priceImpact)}
            </dt>
          </div>
          <div className="flex justify-between">
            <dt className="text-xs text-gray-500">Slippage Tolerance</dt>
            <dt className="text-xs text-gray-500">{formatPercent(slippage)}</dt>
          </div>
          <div className="flex justify-between">
            <dt className="text-xs text-gray-500">Liquidity Provider Fee</dt>
            <dt className="text-xs text-gray-500">
              {formatPercent(LIQUIDITY_PROVIDER_FEE)}
            </dt>
          </div>
        </dl>
        <div className="mt-4 border-t border-gray-700">
          <div className="my-4 space-y-1">
            {isExactOut ? (
              <>
                <p className="text-xs text-gray-400">
                  Input is estimated. You will sell at most:
                </p>
                <p className="text-sm">
                  {formatNumber(worstAmountIn)}{" "}
                  <span className="text-gray-300">{inputPairToken.symbol}</span>
                </p>
                <p className="text-xs text-gray-400">
                  or the transaction will revert.
                </p>
              </>
            ) : (
              <>
                <p className="text-xs text-gray-400">
                  Output is estimated. You will receieve at least:
                </p>
                <p className="text-sm">
                  {formatNumber(worstAmountOut)}{" "}
                  <span className="text-gray-300">
                    {outputPairToken.symbol}
                  </span>
                </p>
                <p className="text-xs text-gray-400">
                  or the transaction will revert.
                </p>
              </>
            )}
          </div>
          <Button
            disabled={isLoading}
            onClick={() => {
              if (!isApproved) {
                approve();
              } else {
                swap(
                  inputPairToken,
                  outputPairToken,
                  inputValues[0],
                  inputValues[1],
                  isExactOut
                );
              }
            }}
          >
            {isApproved
              ? isLoading
                ? "Swapping..."
                : "Confirm Swap"
              : `Approve ${inputPairToken.symbol}`}
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
  const loaderData = useLoaderData<LoaderData>();
  const location = useLocation();
  const [searchString, setSearchString] = useState("");

  const filteredTokens = loaderData.tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchString.toLowerCase()) ||
      token.name.toLowerCase().includes(searchString.toLowerCase())
  );

  const currentToken =
    type === "input" ? loaderData.inputToken : loaderData.outputToken;
  const otherToken =
    type === "input" ? loaderData.outputToken : loaderData.inputToken;

  useEffect(() => {
    onClose();
    setSearchString("");
  }, [location.search, onClose]);

  return (
    <Modal isOpen={modalProps.open} onClose={onClose}>
      <div>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-200"
        >
          Select a Token
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Select a token to replace with {currentToken.symbol}.
          </p>
        </div>
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
              className="block w-full rounded-md border-gray-700 bg-gray-900 pr-10 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              placeholder="Search token"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <SearchIcon
                className="h-5 w-5 text-gray-700"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <ul className="mt-2 h-80 overflow-auto rounded-md border border-gray-700 bg-gray-900">
          {filteredTokens.map((token) => {
            const isDisabled =
              token.id === currentToken.id || token.id === otherToken.id;
            return (
              <li key={token.id}>
                <div
                  className={cn(
                    isDisabled
                      ? "pointer-events-none opacity-20"
                      : "hover:bg-gray-700/40",
                    "relative flex items-center space-x-3 px-6 py-5 transition duration-150 ease-in-out focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-500"
                  )}
                >
                  <div className="flex-shrink-0">
                    <TokenLogo
                      tokenAddress={token.id}
                      symbol={token.symbol}
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    {isDisabled ? (
                      <div>
                        <p className="text-xs font-medium text-gray-500">
                          {token.name}
                        </p>
                        <p className="truncate text-sm text-gray-200">
                          {token.symbol}
                        </p>
                      </div>
                    ) : (
                      <Link
                        prefetch="intent"
                        to={`/?input=${
                          type === "input" ? token.symbol : otherToken.symbol
                        }&output=${
                          type === "output" ? token.symbol : otherToken.symbol
                        }`}
                      >
                        <span
                          className="absolute inset-0"
                          aria-hidden="true"
                        ></span>
                        <p className="text-xs font-medium text-gray-500">
                          {token.name}
                        </p>
                        <p className="truncate text-sm text-gray-200">
                          {token.symbol}
                        </p>
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
};

export function CatchBoundary() {
  const caught = useCatch();
  if (caught.status === 404) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-[0.6rem] text-gray-500 sm:text-base">
          {caught.data}
        </p>
      </div>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}
