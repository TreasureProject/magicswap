import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { PairToken } from "~/types";
import { formatNumber, formatPercent } from "~/utils/number";
import { formatUsd } from "~/utils/price";
import { TimeIntervalLineGraph } from "./Graph";

export default function PairTokenInput({
  id,
  token,
  balance,
  value,
  onChange,
  onTokenClick,
}: {
  id: string;
  token: PairToken;
  balance: number;
  value: number;
  onChange: (value: number) => void;
  onTokenClick: () => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const positive = token.price24hChange >= 0;
  const parsedInput = Number.isNaN(parseFloat(inputValue))
    ? 0
    : parseFloat(inputValue);

  useEffect(() => {
    setInputValue(value ? value.toString() : "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    const nextValue = parseFloat(inputValue);
    if (nextValue !== value) {
      onChange(nextValue);
    }
  };

  return (
    <div className="flex-1 space-y-6 rounded-md border border-transparent bg-gray-800 p-6 hover:border-gray-700">
      <div>
        <label htmlFor={id} className="sr-only">
          Balance
        </label>
        <div className="relative border-b border-gray-600 focus-within:border-red-600">
          <input
            id={id}
            type="text"
            className="block w-full border-0 border-b border-transparent bg-gray-800 pr-12 pb-6 focus:border-red-600 focus:ring-0 sm:text-lg lg:text-2xl"
            placeholder="0.00"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="pointer-events-none absolute left-0 bottom-2 flex flex-col items-end pl-3">
            <span className="text-xs text-gray-500">
              ~{" "}
              {formatUsd(token.priceUsd * (parsedInput > 0 ? parsedInput : 1))}
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
              className={clsx(
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
