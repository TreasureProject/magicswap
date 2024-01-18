import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ClientOnly } from "remix-utils/client-only";

import { TokenLogo } from "./TokenLogo";
import { usePrice } from "~/context/priceContext";
import type { Token } from "~/types";
import {
  formatBigIntDisplay,
  formatBigIntInput,
  formatUsdLong,
} from "~/utils/number";

type Props = {
  id: string;
  label: string;
  token: Token;
  balance: bigint;
  value: string;
  onChange: (value: string) => void;
  onTokenClick: () => void;
};

export default function PairTokenInput({
  id,
  label,
  token,
  balance,
  value,
  onChange,
  onTokenClick,
}: Props) {
  const { magicUsd } = usePrice();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let periodMatches = 0;
    const nextValue = e.target.value
      .replace(/,/g, ".") // Replace commas with periods
      .replace(/[^0-9.]/g, "") // Replace all non-numeric and non-period characters
      .replace(/\./g, (match) => (++periodMatches > 1 ? "" : match)); // Replace all periods after the first one
    onChange(nextValue);
  };

  const parsedValue = parseFloat(value);

  return (
    <div className="group flex-1">
      <div className="rounded-md border border-night-800/50 bg-[#131D2E] transition-colors group-hover:border-night-700/50">
        <div className="border-b border-night-800/50 p-4 transition-colors group-hover:border-night-700/50 2xl:p-6">
          <label htmlFor={id} className="sr-only">
            {label}
          </label>
          <div className="flex items-center justify-between gap-3 focus-within:border-ruby-600">
            <button
              className="flex shrink-0 items-center gap-2.5"
              onClick={onTokenClick}
            >
              <TokenLogo token={token} className="h-10 w-10 rounded-full" />
              <div className="text-left">
                <p className="flex items-center gap-1 font-bold">
                  {token.symbol}
                  <ChevronDownIcon className="h-4 w-4" />
                </p>
                {token.symbol !== token.name ? (
                  <span className="text-sm text-night-300">{token.name}</span>
                ) : null}
              </div>
            </button>
            <div className="grow text-right">
              <input
                id={id}
                type="text"
                className="w-full border-0 border-transparent bg-transparent p-0 text-right focus:ring-0 sm:text-lg lg:text-2xl"
                placeholder="0.00"
                value={value === "0" ? "" : value}
                onChange={handleChange}
              />
              <ClientOnly>
                {() => (
                  <span className="text-xs text-night-500">
                    ~{" "}
                    {formatUsdLong(
                      token.priceMagic *
                        magicUsd *
                        (!parsedValue || Number.isNaN(parsedValue)
                          ? 1
                          : parsedValue),
                    )}
                  </span>
                )}
              </ClientOnly>
            </div>
          </div>
        </div>
        <div className="space-y-4 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span
              className="cursor-pointer text-sm text-night-300"
              onClick={() =>
                onChange(formatBigIntInput(balance, token.decimals))
              }
            >
              Balance:{" "}
              <ClientOnly>
                {() => (
                  <span className="text-night-100">
                    {formatBigIntDisplay(balance, token.decimals)}
                  </span>
                )}
              </ClientOnly>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
