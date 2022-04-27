import * as React from "react";
import { useLocale } from "@react-aria/i18n";
import { useNumberField } from "@react-aria/numberfield";
import { useNumberFieldState } from "@react-stately/numberfield";
import { PairToken } from "~/types";
import { formatNumber } from "~/utils/number";
import { formatUsd } from "~/utils/price";

export default function TokenInput({
  className,
  token,
  tokenSymbol,
  price,
  balance = 0,
  ...numberFieldProps
}: Parameters<typeof useNumberField>[0] & {
  className?: string;
  token?: PairToken;
  tokenSymbol?: string;
  price?: number;
  balance?: number;
}) {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...numberFieldProps, locale });
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { labelProps, inputProps } = useNumberField(
    numberFieldProps,
    state,
    inputRef
  );

  return (
    <div className={className}>
      <label className="sr-only" {...labelProps}>
        {numberFieldProps.label}
      </label>
      <div className="relative focus-within:border-red-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center space-x-2 pl-3 pb-4">
          <img
            src="https://via.placeholder.com/400"
            alt="placeholder"
            className="z-10 h-4 w-4 rounded-full ring-1"
          />
          <span className="block font-semibold text-white sm:text-sm">
            {token?.symbol ?? tokenSymbol}
          </span>
        </div>
        <input
          {...inputProps}
          ref={inputRef}
          className="block w-full rounded-md border-0 bg-gray-900 pl-7 pb-6 text-right focus:outline-none focus:ring-2 focus:ring-red-600 sm:text-lg lg:text-2xl"
          placeholder="0.00"
        />
        <div
          className="absolute left-0 bottom-2 flex cursor-pointer flex-col items-end pl-3"
          onClick={() => numberFieldProps.onChange?.(balance)}
        >
          <span className="text-xs text-gray-500">
            Balance: {formatNumber(balance)}
          </span>
        </div>
        <div className="pointer-events-none absolute bottom-2 right-0 flex flex-col items-end pr-3">
          <span className="text-xs text-gray-500">
            ~{" "}
            {formatUsd(
              (token?.priceUsd ?? price ?? 0) *
                (Number.isNaN(state.numberValue) ? 1 : state.numberValue)
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
