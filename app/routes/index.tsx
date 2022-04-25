import { SpinnerIcon, StarIcon } from "~/components/Icons";
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { LineGraph } from "../components/Graph";
import cn from "clsx";
import { Button } from "~/components/Button";
import React from "react";
import {
  Link,
  useCatch,
  useFetcher,
  useLoaderData,
  useLocation,
  useParams,
} from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { getTokenBySymbol, getTokens } from "~/utils/tokens.server";
import type { LoaderData as ApiLoaderData } from "./api/get-token-list";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { ArrowRightIcon, ArrowDownIcon } from "@heroicons/react/outline";
import { Pair, PairToken, Token } from "~/types";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import { formatNumber, formatPercent } from "~/utils/number";
import { getPair } from "~/utils/pair.server";
import { formatUsd } from "~/utils/price";

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

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const inputCurrency = url.searchParams.get("inputCurrency") ?? "MAGIC";
  const outputCurrency = url.searchParams.get("outputCurrency") ?? "WETH";

  const tokenList = await getTokens();
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

  const pair = await getPair(inputToken.id, outputToken.id);

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

const TokenInput = ({
  onTokenClick,
  token,
  balance,
}: {
  onTokenClick: () => void;
  token: PairToken;
  balance: number;
}) => {
  const positive = token.price24hChange >= 0;
  return (
    <div className="flex-1 space-y-6 rounded-md border border-transparent bg-gray-800 p-6 hover:border-gray-700">
      <div>
        <label htmlFor="balance" className="sr-only">
          Balance
        </label>
        <div className="relative border-b border-gray-600 focus-within:border-red-600">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pb-4">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="text"
            name="balance"
            id="balance"
            className="block w-full border-0 border-b border-transparent bg-gray-800 pl-7 pr-12 pb-6 focus:border-red-600 focus:ring-0 sm:text-lg lg:text-2xl"
            placeholder="0.00"
          />
          <div className="pointer-events-none absolute left-0 bottom-2 flex flex-col items-end pl-3">
            <span className="text-xs text-gray-500">~ $123.45</span>
          </div>
          <div className="absolute bottom-2 right-0 flex flex-col items-end pr-3">
            <div className="relative mb-1 flex items-center space-x-1">
              <p className="font-bold text-gray-300 sm:text-sm">
                {token.symbol}
              </p>
              <ChevronDownIcon className="h-4 w-4" />
              <button
                className="absolute inset-0 h-full w-full"
                onClick={onTokenClick}
              />
            </div>
            <span className="text-xs text-gray-500">
              Balance: {formatNumber(balance)}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-4 bg-gray-900 p-4">
        <div className="flex items-center justify-between">
          <p className="font-bold">
            {token.symbol}{" "}
            {token.symbol.toLowerCase() !== token.name.toLowerCase() && (
              <>({token.name})</>
            )}
          </p>
          <div className="flex items-baseline">
            <p className="text-sm font-normal text-gray-300 lg:text-lg">
              {formatUsd(token.priceUsd)} USD
            </p>
            <p
              className={cn(
                "ml-1 flex items-baseline text-[0.6rem] font-semibold lg:text-xs",
                {
                  "text-red-600": !positive,
                  "text-green-600": positive,
                }
              )}
            >
              {positive ? (
                <ArrowSmUpIcon
                  className="h-3 w-3 flex-shrink-0 self-center text-green-500 lg:h-4 lg:w-4"
                  aria-hidden="true"
                />
              ) : (
                <ArrowSmDownIcon
                  className="h-3 w-3 flex-shrink-0 self-center text-red-500 lg:h-4 lg:w-4"
                  aria-hidden="true"
                />
              )}
              <span className="sr-only">
                {positive ? "Increased by" : "Decreased by"}
              </span>
              {formatPercent(token.price24hChange)}
            </p>
          </div>
        </div>
        <div className="h-36">
          <LineGraph
            gradient={{
              from: positive ? "#96e4df" : "#ee9617",
              to: positive ? "#21d190" : "#fe5858",
            }}
            data={token.price1wUsd.map(({ date, value }) => ({
              x: date,
              y: value,
            }))}
          />
        </div>
        <p className="text-xs font-light text-gray-500">
          VOL {formatUsd(token.volume1wUsd)}
        </p>
      </div>
    </div>
  );
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

  const inputCurrencyBalance = useTokenBalance(data.inputToken);
  const outputCurrencyBalance = useTokenBalance(data.outputToken);

  const onClose = React.useCallback(
    () =>
      setOpenTokenListModalProps((props) => ({
        ...props,
        open: false,
      })),
    []
  );

  return (
    <>
      <div className="flex flex-col items-center">
        <StarIcon className="h-8 w-8" />
        <h2 className="mt-14 text-base font-bold sm:text-lg">
          Swap {data.inputToken.symbol} to {data.outputToken.symbol}
        </h2>
        <p className="text-sm text-gray-500 sm:text-base">
          The easiest way to swap your tokens
        </p>
        <div className="mt-14 flex w-full flex-col lg:flex-row">
          <TokenInput
            token={data.inputToken}
            balance={inputCurrencyBalance}
            onTokenClick={() =>
              setOpenTokenListModalProps({
                open: true,
                type: "input",
              })
            }
          />
          <div className="flex basis-24 items-center justify-center lg:basis-32">
            <Link
              to={`/?inputCurrency=${data.outputToken.symbol}&outputCurrency=${data.inputToken.symbol}`}
              className="group rounded-full p-2 transition duration-300 ease-in-out hover:bg-gray-500/20"
            >
              <ArrowRightIcon className="hidden h-6 w-6 animate-rotate-back text-gray-500 group-hover:animate-rotate-180 lg:block" />
              <ArrowDownIcon className="block h-6 w-6 animate-rotate-back text-gray-500 group-hover:animate-rotate-180 lg:hidden" />
            </Link>
          </div>
          <TokenInput
            token={data.outputToken}
            balance={outputCurrencyBalance}
            onTokenClick={() =>
              setOpenTokenListModalProps({
                open: true,
                type: "output",
              })
            }
          />
        </div>
        <div className="mt-12 w-full px-0 lg:px-72">
          <Button>Swap</Button>
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
                            <img
                              src="https://via.placeholder.com/400"
                              alt="placeholder"
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
  console.log(caught);
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
