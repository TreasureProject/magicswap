import type { PairToken } from "~/types";
import { formatNumber } from "~/utils/number";
import { formatUsd } from "~/utils/price";
import { useNumberInput } from "~/hooks/useNumberInput";
import { TokenLogo } from "~/components/TokenLogo";

export default function TokenInput({
  id,
  label,
  token,
  tokenSymbol,
  price,
  balance = 0,
  value,
  onChange,
}: {
  id: string;
  label: string;
  token?: PairToken;
  tokenSymbol?: string;
  price?: number;
  balance: number;
  value: number;
  onChange: (value: number) => void;
}) {
  const { inputValue, parsedValue, handleBlur, handleChange } = useNumberInput({
    value,
    onChange,
  });

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative focus-within:border-red-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center space-x-2 pl-3 pb-4">
          {token ? (
            <TokenLogo
              tokenAddress={token.id}
              alt="placeholder"
              className="z-10 h-4 w-4 rounded-full ring-1"
            />
          ) : null}
          <span className="block font-semibold text-white sm:text-sm">
            {token?.symbol ?? tokenSymbol}
          </span>
        </div>
        <input
          id={id}
          type="text"
          className="block w-full rounded-md border-0 bg-gray-900 pl-7 pb-6 text-right focus:outline-none focus:ring-2 focus:ring-red-600 sm:text-lg lg:text-2xl"
          placeholder="0.00"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div
          className="absolute left-0 bottom-2 flex cursor-pointer flex-col items-end pl-3"
          onClick={() => onChange(balance)}
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
                (parsedValue > 0 ? parsedValue : 1)
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
