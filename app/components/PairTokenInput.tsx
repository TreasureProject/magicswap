import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import clsx from "clsx";
import { useNumberInput } from "~/hooks/useNumberInput";
import type { PairToken } from "~/types";
import { formatNumber, formatPercent } from "~/utils/number";
import { formatUsd, getPrice24hChange } from "~/utils/price";
import { TimeIntervalLineGraph } from "./Graph";
import { TokenLogo } from "./TokenLogo";

export default function PairTokenInput({
  id,
  label,
  token,
  balance,
  value,
  onChange,
  onTokenClick,
}: {
  id: string;
  label: string;
  token: PairToken;
  balance: number;
  value: number;
  onChange: (value: number) => void;
  onTokenClick: () => void;
}) {
  const { inputValue, parsedValue, handleChange } = useNumberInput({
    value,
    onChange,
  });
  const price24hChange = getPrice24hChange(token);
  const positive = price24hChange >= 0;

  return (
    <div className="flex-1 space-y-4 rounded-md border border-transparent bg-[#20232d] p-4 hover:border-gray-700 2xl:space-y-6 2xl:p-6">
      <div>
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <div className="relative border-b border-gray-600 focus-within:border-red-600">
          <input
            id={id}
            type="text"
            className="block w-full border-0 border-b border-transparent bg-transparent pr-12 pb-6 focus:border-red-600 focus:ring-0 sm:text-lg lg:text-2xl"
            placeholder="0.00"
            value={inputValue}
            onChange={handleChange}
          />
          <div className="pointer-events-none absolute left-0 bottom-2 flex flex-col items-end pl-3">
            <span className="text-xs text-gray-500">
              ~{" "}
              {formatUsd(token.priceUsd * (parsedValue > 0 ? parsedValue : 1))}
            </span>
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
            <span
              className="cursor-pointer text-xs text-gray-500"
              onClick={() => onChange(balance)}
            >
              Balance: {formatNumber(balance)}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-4 rounded-lg bg-[#1c1c25] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TokenLogo
              tokenAddress={token.id}
              symbol={token.symbol}
              className="h-5 w-5 rounded-full"
            />
            <p className="truncate text-xs font-bold sm:text-base">
              {token.symbol}{" "}
              {token.symbol.toLowerCase() !== token.name.toLowerCase() && (
                <>({token.name})</>
              )}
            </p>
          </div>
          <div className="flex flex-col items-end sm:flex-row sm:items-baseline">
            <p className="whitespace-nowrap text-xs font-normal text-gray-300 sm:text-lg">
              {formatUsd(token.priceUsd)} USD
            </p>
            <p
              className={clsx(
                "flex items-baseline text-[0.5rem] font-semibold sm:ml-1 sm:text-xs",
                {
                  "text-red-600": !positive,
                  "text-green-600": positive,
                }
              )}
            >
              {positive ? (
                <ArrowSmUpIcon
                  className="h-3 w-3 flex-shrink-0 self-center text-green-500 sm:h-4 sm:w-4"
                  aria-hidden="true"
                />
              ) : (
                <ArrowSmDownIcon
                  className="h-3 w-3 flex-shrink-0 self-center text-red-500 sm:h-4 sm:w-4"
                  aria-hidden="true"
                />
              )}
              <span className="sr-only">
                {positive ? "Increased by" : "Decreased by"}
              </span>
              {formatPercent(price24hChange)}
            </p>
          </div>
        </div>
        <div className="h-24 2xl:h-36">
          <TimeIntervalLineGraph
            gradient={{
              from: positive ? "#96e4df" : "#ee9617",
              to: positive ? "#21d190" : "#fe5858",
            }}
            data={token.price1wUsdIntervals}
          />
        </div>
        <p className="text-xs font-light text-gray-500">
          VOL {formatUsd(token.volume1wUsd)}
        </p>
      </div>
    </div>
  );
}
