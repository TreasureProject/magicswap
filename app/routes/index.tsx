import {
  ArrowDownwardIcon,
  ArrowForwardIcon,
  SpinnerIcon,
  StarIcon,
} from "~/components/Icons";
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { LineGraph } from "../components/Graph";
import cn from "clsx";
import { Button } from "~/components/Button";
import React from "react";
import { Link, useFetcher, useLoaderData, useLocation } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import type { Tokens } from "~/utils/tokens.server";
import { getTokens } from "~/utils/tokens.server";
import { getTokenBySymbol } from "~/utils/tokens.server";
import type { LoaderData as ApiLoaderData } from "./api/get-token-list";
import { ChevronDownIcon } from "@heroicons/react/solid";

type LoaderData = {
  inputCurrencyData: Tokens[number];
  outputCurrencyData: Tokens[number];
  tokenList: Tokens;
};

export const meta: MetaFunction = ({ data }) => {
  if (!data) {
    return {
      title: "Swap | Magicswap",
    };
  }

  const { inputCurrencyData, outputCurrencyData } = data as LoaderData;
  return {
    title: `Swap ${inputCurrencyData.symbol} to ${outputCurrencyData.symbol} | Magicswap`,
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const inputCurrency = url.searchParams.get("inputCurrency") ?? "MAGIC";
  const outputCurrency = url.searchParams.get("outputCurrency") ?? "ETH";

  const inputCurrencyData = await getTokenBySymbol(inputCurrency);
  const outputCurrencyData = await getTokenBySymbol(outputCurrency);
  const tokenList = await getTokens();

  if (!inputCurrencyData || !outputCurrencyData) {
    throw new Response("Pool not found", {
      status: 404,
    });
  }

  return json<LoaderData>({
    inputCurrencyData,
    outputCurrencyData,
    tokenList,
  });
};

const TokenInput = ({
  positive,
  onTokenClick,
  name,
}: {
  // for demo purposes
  positive: boolean;
  onTokenClick: () => void;
  name: string;
}) => {
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
              <p className="font-bold text-gray-300 sm:text-sm">{name}</p>
              <ChevronDownIcon className="h-4 w-4" />
              <button className="absolute inset-0" onClick={onTokenClick} />
            </div>
            <span className="text-xs text-gray-500">Balance: 123123</span>
          </div>
        </div>
      </div>
      <div className="space-y-4 bg-gray-900 p-4">
        <div className="flex items-center justify-between">
          <p className="font-bold">{name}</p>
          <div className="flex items-baseline">
            <p className="text-sm font-normal text-gray-300 lg:text-lg">
              $3.45 USD
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
              <span className="sr-only">Increased by</span>
              3.3%
            </p>
          </div>
        </div>
        <div className="h-36">
          <LineGraph
            gradient={{
              from: positive ? "#96e4df" : "#ee9617",
              to: positive ? "#21d190" : "#fe5858",
            }}
            data={[
              {
                x: 0.4,
                y: 0.5,
              },
              {
                x: 0.6,
                y: 0.4,
              },
              {
                x: 0.7,
                y: 0.5,
              },
              {
                x: 0.9,
                y: 0.6,
              },
              {
                x: 1.2,
                y: 0.5,
              },
              {
                x: 1.6,
                y: 0.2,
              },
              {
                x: 2.0,
                y: 0.9,
              },
              {
                x: 2.4,
                y: 0.6,
              },
              {
                x: 2.8,
                y: 0.7,
              },
            ]}
          />
        </div>
        <p className="text-xs font-light text-gray-500">VOL $1.2M</p>
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
        {/* Make this dynamic */}
        <h2 className="mt-14 text-base font-bold sm:text-lg">
          Swap {data.inputCurrencyData.symbol} to{" "}
          {data.outputCurrencyData.symbol}
        </h2>
        <p className="text-sm text-gray-500 sm:text-base">
          The easiest way to swap your tokens
        </p>
        <div className="mt-14 flex w-full flex-col lg:flex-row">
          <TokenInput
            name={data.inputCurrencyData.symbol}
            onTokenClick={() =>
              setOpenTokenListModalProps({
                open: true,
                type: "input",
              })
            }
            positive
          />
          <div className="flex basis-24 items-center justify-center lg:basis-32">
            <ArrowForwardIcon className="hidden h-6 w-6 lg:block" />
            <ArrowDownwardIcon className="block h-6 w-6 lg:hidden" />
          </div>
          <TokenInput
            name={data.outputCurrencyData.symbol}
            onTokenClick={() =>
              setOpenTokenListModalProps({
                open: true,
                type: "output",
              })
            }
            positive={false}
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
    type === "input"
      ? loaderData.inputCurrencyData
      : loaderData.outputCurrencyData;

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
                    const isSelected = token.symbol === currentCurrency.symbol;
                    return (
                      <li key={token.address}>
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
                                    : loaderData.inputCurrencyData.symbol
                                }&outputCurrency=${
                                  type === "output"
                                    ? token.symbol
                                    : loaderData.outputCurrencyData.symbol
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
