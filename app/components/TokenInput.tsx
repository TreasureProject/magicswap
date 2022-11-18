import type { PairToken } from "~/types";
import { formatBigNumber, formatUsd, parseBigNumber } from "~/utils/number";
import { TokenLogo } from "~/components/TokenLogo";
import { usePrice } from "~/context/priceContext";
import type { BigNumber } from "ethers";

type Props = {
  id: string;
  label: string;
  token?: PairToken;
  tokenSymbol?: string;
  price?: number;
  balance: BigNumber;
  value: string;
  onChange: (value: string) => void;
};

export default function TokenInput({
  id,
  label,
  token,
  tokenSymbol,
  price,
  balance,
  value,
  onChange,
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
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative focus-within:border-ruby-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center space-x-2 pl-3 pb-4">
          {!!token && (
            <TokenLogo
              token={token}
              alt="placeholder"
              className="z-10 h-4 w-4 rounded-full ring-1"
            />
          )}
          <span className="block font-semibold text-white sm:text-sm">
            {token?.symbol ?? tokenSymbol}
          </span>
        </div>
        <input
          id={id}
          type="text"
          className="block w-full rounded-md border-0 bg-night-900 pl-7 pb-6 text-right focus:outline-none focus:ring-2 focus:ring-ruby-600 sm:text-lg lg:text-2xl"
          placeholder="0.00"
          value={value === "0" ? "" : value}
          onChange={handleChange}
        />
        <div
          className="absolute left-0 bottom-2 flex cursor-pointer flex-col items-end pl-3"
          onClick={() =>
            onChange(parseBigNumber(balance, token?.decimals).toString())
          }
        >
          <span className="text-xs text-night-500">
            Balance: {formatBigNumber(balance, token?.decimals)}
          </span>
        </div>
        <div className="pointer-events-none absolute bottom-2 right-0 flex flex-col items-end pr-3">
          <span className="text-xs text-night-500">
            ~{" "}
            {formatUsd(
              (token?.priceMagic ?? 0) *
                magicUsd *
                (parsedValue > 0 ? parsedValue : 1)
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
