import { SpinnerIcon, StarIcon } from "~/components/Icons";
import {
  ArrowRightIcon,
  ArrowDownIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import cn from "clsx";
import { Button } from "~/components/Button";
import React from "react";
import {
  Link,
  useCatch,
  useFetcher,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { getTokenBySymbol, getTokens } from "~/utils/tokens.server";
import type { LoaderData as ApiLoaderData } from "./api/get-token-list";
import type { Pair, PairToken, Token } from "~/types";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import { getPair } from "~/utils/pair.server";
import PairTokenInput from "~/components/PairTokenInput";
import { useState } from "react";
import { useSwap } from "~/hooks/useSwap";
import { TokenLogo } from "~/components/TokenLogo";
import { CogIcon } from "@heroicons/react/outline";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/Popover";
import { useApproval } from "~/hooks/useApproval";
import { getEnvVariable } from "~/utils/env";

import { useUser } from "~/context/userContext";
import { NumberField } from "~/components/NumberField";
import { usePair } from "~/hooks/usePair";

type LoaderData = {
  tokenList: Token[];
  inputToken: PairToken;
  outputToken: PairToken;
  pair: Pair;
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
  const inputCurrency = url.searchParams.get("inputCurrency") ?? "USDC";
  const outputCurrency = url.searchParams.get("outputCurrency") ?? "MAGIC";

  const tokenList = await getTokens(exchangeUrl);

  const inputToken = getTokenBySymbol(tokenList, inputCurrency);
  const outputToken = getTokenBySymbol(tokenList, outputCurrency);

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

  const pair = await getPair(inputToken.id, outputToken.id, exchangeUrl);

  if (!pair) {
    throw new Response("Swap not allowed", {
      status: 404,
    });
  }

  return json<LoaderData>({
    tokenList,
    inputToken: pair.token0.id === inputToken.id ? pair.token0 : pair.token1,
    outputToken: pair.token0.id === outputToken.id ? pair.token0 : pair.token1,
    pair,
  });
};

export default function Index() {
  const data = useLoaderData<LoaderData>();
  const [openTokenListModalProps, setOpenTokenListModalProps] = React.useState<{
    open: boolean;
    type: "input" | "output";
  }>({
    open: false,
    type: "input",
  });
  const [advancedSettings, setAdvancedSettings] = React.useState({
    slippage: 0.005,
    deadline: 20,
  });
  const [isExactOut, setIsExactOut] = useState(false);
  const [inputValues, setInputValues] = useState([0, 0]);
  const inputCurrencyBalance = useTokenBalance(data.inputToken);
  const outputCurrencyBalance = useTokenBalance(data.outputToken);
  const pair = usePair(data.pair);
  const { isApproved, approve } = useApproval(data.inputToken);
  const { openWalletModal, isConnected } = useUser();

  const swap = useSwap();
  const inputPairToken =
    pair.token0.id === data.inputToken.id ? pair.token0 : pair.token1;
  const outputPairToken =
    pair.token0.id === data.outputToken.id ? pair.token0 : pair.token1;

  const onClose = React.useCallback(
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
    const amountInWithFee = value * 0.997;
    const amountOut = Math.max(
      (amountInWithFee * outputPairToken.reserve) /
        (inputPairToken.reserve + amountInWithFee),
      0
    );
    console.log("Price Impact:", (1 - amountOut / rawAmountOut) * 100);
    setInputValues([value, amountOut]);
  };

  const handleOutputChange = (value: number) => {
    setIsExactOut(true);
    const rawAmountIn = value * inputPairToken.price;
    const amountIn = Math.max(
      (inputPairToken.reserve * value) /
        ((outputPairToken.reserve - value) * 0.997),
      0
    );
    console.log("Price Impact:", (1 - rawAmountIn / amountIn) * 100);
    setInputValues([amountIn, value]);
  };

  const handleSwap = () => {
    if (!isConnected) {
      openWalletModal();
    } else {
      swap(
        inputPairToken,
        outputPairToken,
        inputValues[0],
        inputValues[1],
        isExactOut,
        advancedSettings.slippage,
        advancedSettings.deadline
      );
    }
  };

  const insufficientBalance = inputCurrencyBalance < inputValues[0];

  return (
    <>
      <div className="flex flex-col items-center">
        <StarIcon className="h-8 w-8" />
        <h2 className="mt-14 text-base font-bold sm:text-lg">
          Swap {inputPairToken.symbol} to {outputPairToken.symbol}
        </h2>
        <p className="text-sm text-gray-500 sm:text-base">
          The easiest way to swap your tokens
        </p>
        <div className="mt-14 w-full rounded-xl bg-gray-700/10 p-4 shadow-glass backdrop-blur-md sm:p-6">
          <div className="flex justify-end">
            <div className="relative inline-block text-left">
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
                      <p className="text-sm text-gray-200">
                        Transaction Deadline
                      </p>
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
                            <span className="text-sm text-gray-400">
                              Minutes
                            </span>
                          </div>
                        </NumberField>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="mt-6 flex flex-col xl:flex-row">
            <PairTokenInput
              id="inputToken"
              label={`${inputPairToken.symbol} Amount`}
              token={inputPairToken}
              balance={inputCurrencyBalance}
              value={inputValues[0]}
              onChange={handleInputChange}
              onTokenClick={() =>
                setOpenTokenListModalProps({
                  open: true,
                  type: "input",
                })
              }
            />
            <div className="flex basis-24 items-center justify-center lg:basis-32">
              <Link
                to={`/?inputCurrency=${outputPairToken.symbol}&outputCurrency=${inputPairToken.symbol}`}
                className="group rounded-full p-2 transition duration-300 ease-in-out hover:bg-gray-500/20"
              >
                <ArrowRightIcon className="hidden h-6 w-6 animate-rotate-back text-gray-500 group-hover:animate-rotate-180 lg:block" />
                <ArrowDownIcon className="block h-6 w-6 animate-rotate-back text-gray-500 group-hover:animate-rotate-180 lg:hidden" />
              </Link>
            </div>
            <PairTokenInput
              id="outputToken"
              label={`${outputPairToken.symbol} Amount`}
              token={outputPairToken}
              balance={outputCurrencyBalance}
              value={inputValues[1]}
              onChange={handleOutputChange}
              onTokenClick={() =>
                setOpenTokenListModalProps({
                  open: true,
                  type: "output",
                })
              }
            />
          </div>
        </div>
        <div className="mt-12 w-full space-y-4 px-0 lg:px-72">
          {inputValues[0] > 0 && !isApproved && !insufficientBalance && (
            <Button onClick={approve}>Approve {inputPairToken.symbol}</Button>
          )}
          <Button
            disabled={
              isConnected &&
              (!inputValues[0] ||
                !inputValues[1] ||
                insufficientBalance ||
                !isApproved)
            }
            onClick={handleSwap}
          >
            {!isConnected
              ? "Connect to a wallet"
              : insufficientBalance
              ? "Insufficient Balance"
              : inputValues[0] && inputValues[1]
              ? "Swap"
              : "Enter an Amount"}
          </Button>
        </div>
      </div>
      <Modal
        modalProps={openTokenListModalProps}
        loaderData={data}
        onClose={onClose}
      />
    </>
  );
}

const Modal = ({
  modalProps,
  onClose,
  loaderData,
}: {
  modalProps: {
    open: boolean;
    type: "input" | "output";
  };
  onClose: () => void;
  loaderData: LoaderData;
}) => {
  const { type } = modalProps;

  const fetcher = useFetcher<ApiLoaderData>();
  const location = useLocation();

  function handleSearchToken(event: React.ChangeEvent<HTMLInputElement>) {
    const searchToken = event.currentTarget.value;
    const searchParams = new URLSearchParams();
    searchParams.set("searchToken", searchToken);
    fetcher.load(`/api/get-token-list/?${searchParams.toString()}`);
  }

  const isLoading = fetcher.state === "loading";

  const listTokens = fetcher.data?.tokenList ?? loaderData.tokenList;

  const currentCurrency =
    type === "input" ? loaderData.inputToken : loaderData.outputToken;

  React.useEffect(() => {
    onClose();
  }, [location.search, onClose]);

  return (
    <Transition.Root show={modalProps.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block w-full transform overflow-hidden rounded-lg bg-gray-800 px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:max-w-sm sm:p-6 sm:align-middle">
              <div>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-200"
                >
                  Select a Token
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Select a token to replace with {currentCurrency.symbol}.
                  </p>
                </div>
                <div className="mt-3">
                  <fetcher.Form>
                    <label htmlFor="search-token" className="sr-only">
                      Search Token
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <input
                        type="text"
                        name="search-token"
                        id="search-token"
                        onChange={handleSearchToken}
                        className="block w-full rounded-md border-gray-700 bg-gray-900 pr-10 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                        placeholder="Search token"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        {isLoading ? (
                          <SpinnerIcon className="h-5 w-5 animate-spin fill-gray-900 text-gray-700" />
                        ) : (
                          <SearchIcon
                            className="h-5 w-5 text-gray-700"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>
                  </fetcher.Form>
                </div>
                <ul className="mt-2 h-80 overflow-auto rounded-md border border-gray-700 bg-gray-900">
                  {listTokens.map((token) => {
                    const isSelected = token.id === currentCurrency.id;
                    return (
                      <li key={token.id}>
                        <div
                          className={cn(
                            !isSelected
                              ? "hover:bg-gray-700/40"
                              : "pointer-events-none opacity-20",
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
                            {isSelected ? (
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
                                to={`/?inputCurrency=${
                                  type === "input"
                                    ? token.symbol
                                    : // if selected output currency is the same as input currency,
                                    // then we need to change the output currency to the selected input currency
                                    type === "output" &&
                                      token.symbol ===
                                        loaderData.inputToken.symbol
                                    ? loaderData.outputToken.symbol
                                    : loaderData.inputToken.symbol
                                }&outputCurrency=${
                                  type === "output"
                                    ? token.symbol
                                    : type === "input" &&
                                      token.symbol ===
                                        loaderData.outputToken.symbol
                                    ? loaderData.inputToken.symbol
                                    : loaderData.outputToken.symbol
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
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
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
