import {
  ArrowDownwardIcon,
  ArrowForwardIcon,
  StarIcon,
} from "~/components/Icons";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import { LineGraph } from "../components/Graph";
import cn from "clsx";
import { Button } from "~/components/Button";

const TokenInput = ({
  positive,
}: {
  // for demo purposes
  positive: boolean;
}) => {
  return (
    <div className="flex-1 space-y-6 rounded-md bg-gray-800 p-6">
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
            <span className="text-xs text-gray-500" id="price-currency">
              ~ $123.45
            </span>
          </div>
          <div className="pointer-events-none absolute bottom-2 right-0 flex flex-col items-end pr-3">
            <span
              className="mb-1 font-bold text-gray-300 sm:text-sm"
              id="price-currency"
            >
              MAGIC
            </span>
            <span className="text-xs text-gray-500" id="price-currency">
              Balance: 123123
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-4 bg-gray-900 p-4">
        <div className="flex items-center justify-between">
          <p className="font-bold">MAGIC</p>
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
  return (
    <div className="flex flex-col items-center">
      <StarIcon className="h-8 w-8" />
      {/* Make this dynamic */}
      <h2 className="mt-14 text-base font-bold sm:text-lg">
        Swap MAGIC to Token
      </h2>
      <p className="text-sm text-gray-500 sm:text-base">
        The easiest way to swap your tokens
      </p>
      <div className="mt-14 flex w-full flex-col lg:flex-row">
        <TokenInput positive />
        <div className="flex basis-24 items-center justify-center lg:basis-32">
          <ArrowForwardIcon className="hidden h-6 w-6 lg:block" />
          <ArrowDownwardIcon className="block h-6 w-6 lg:hidden" />
        </div>
        <TokenInput positive={false} />
      </div>
      <div className="mt-12 w-full px-0 lg:px-72">
        <Button>Swap</Button>
      </div>
    </div>
  );
}
