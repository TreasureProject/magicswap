import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  ArrowDownwardIcon,
  ArrowForwardIcon,
  StarIcon,
} from "~/components/Icons";
import { GetTokenPriceQuery } from "~/graphql/generated";
import { sdk } from "~/utils/api.server";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import { LineGraph } from "../components/Graph";
import cn from "clsx";

type LoaderData = {
  tokenPrice: GetTokenPriceQuery;
};

export const loader: LoaderFunction = async () => {
  /* TODO: attach query parameters like sushi:
      /inputCurrency=ETH&outputCurrency=USD

      and fetch like so:

      let url = new URL(request.url);
      let page = url.searchParams.get("inputCurrency") || MAGIC;
      let perPage = url.searchParams.get("outputCurrency") || TOKEN;
  */

  const tokenPrice = await sdk.getTokenPrice({
    id: "0x539bde0d7dbd336b79148aa742883198bbf60342",
  });

  return json<LoaderData>({ tokenPrice });
};

const TokenInput = ({
  positive,
}: {
  // for demo purposes
  positive: boolean;
}) => {
  return (
    <div className="flex-1 p-6 space-y-6 bg-gray-800 rounded-md">
      <div>
        <label htmlFor="balance" className="sr-only">
          Balance
        </label>
        <div className="border-b relative border-gray-600 focus-within:border-red-600">
          <div className="absolute inset-y-0 left-0 pl-3 pb-4 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="text"
            name="balance"
            id="balance"
            className="block pl-7 pr-12 w-full pb-6 border-0 border-b border-transparent bg-gray-800 focus:border-red-600 focus:ring-0 sm:text-lg lg:text-2xl"
            placeholder="0.00"
          />
          <div className="absolute left-0 pl-3 bottom-2 flex flex-col items-end pointer-events-none">
            <span className="text-gray-500 text-xs" id="price-currency">
              ~ $123.45
            </span>
          </div>
          <div className="absolute bottom-2 right-0 pr-3 flex flex-col items-end pointer-events-none">
            <span
              className="text-gray-300 sm:text-sm mb-1 font-bold"
              id="price-currency"
            >
              MAGIC
            </span>
            <span className="text-gray-500 text-xs" id="price-currency">
              Balance: 123123
            </span>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 p-4 space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-bold">MAGIC</p>
          <div className="flex items-baseline">
            <p className="text-sm lg:text-lg font-normal text-gray-300">
              $3.45 USD
            </p>
            <p
              className={cn(
                "ml-1 flex items-baseline text-[0.6rem] lg:text-xs font-semibold",
                {
                  "text-red-600": !positive,
                  "text-green-600": positive,
                }
              )}
            >
              {positive ? (
                <ArrowSmUpIcon
                  className="self-center flex-shrink-0 h-3 w-3 lg:h-4 lg:w-4 text-green-500"
                  aria-hidden="true"
                />
              ) : (
                <ArrowSmDownIcon
                  className="self-center flex-shrink-0 h-3 w-3 lg:h-4 lg:w-4 text-red-500"
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
            ]}
          />
        </div>
        <p className="text-xs font-light text-gray-500">VOL $1.2M</p>
      </div>
    </div>
  );
};

export default function Index() {
  const { tokenPrice } = useLoaderData<LoaderData>();

  return (
    <div className="flex items-center flex-col">
      <StarIcon className="w-8 h-8" />
      {/* Make this dynamic */}
      <h2 className="text-base sm:text-lg font-bold mt-14">
        Swap MAGIC to Token
      </h2>
      <p className="text-gray-500 text-sm sm:text-base">
        The easiest way to swap your tokens
      </p>
      <div className="flex flex-col lg:flex-row w-full mt-14">
        <TokenInput positive />
        <div className="basis-24 lg:basis-32 flex items-center justify-center">
          <ArrowForwardIcon className="w-6 h-6 hidden lg:block" />
          <ArrowDownwardIcon className="w-6 h-6 block lg:hidden" />
        </div>
        <TokenInput positive={false} />
      </div>
    </div>
  );
}
