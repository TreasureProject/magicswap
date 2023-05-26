import { ExternalLinkIcon } from "@heroicons/react/outline";
import {
  // ArrowSmDownIcon,
  // ArrowSmUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import type { BigNumber } from "ethers";
import { usePrice } from "~/context/priceContext";
import { useBlockExplorer } from "~/hooks/useBlockExplorer";
import type { Token } from "~/types";
import {
  formatBigNumberDisplay,
  formatBigNumberInput,
  formatUsdLong,
  // formatPercent
} from "~/utils/number";
// import { getPrice24hChange } from "~/utils/price";
// import { TimeIntervalLineGraph } from "./Graph";
import { TokenLogo } from "./TokenLogo";

type Props = {
  id: string;
  label: string;
  token: Token;
  balance: BigNumber;
  value: string;
  locked?: boolean;
  onChange: (value: string) => void;
  onTokenClick: () => void;
  // showPriceGraph: boolean;
};

export default function PairTokenInput({
  id,
  label,
  token,
  balance,
  value,
  locked = false,
  onChange,
  onTokenClick,
}: Props) {
  const { magicUsd } = usePrice();
  const blockExplorer = useBlockExplorer();
  // const price24hChange = getPrice24hChange(token);
  // const positive = price24hChange >= 0;

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
        <div className="border-b border-night-800/50 p-2 transition-colors group-hover:border-night-700/50 sm:p-4 2xl:p-6">
          <label htmlFor={id} className="sr-only">
            {label}
          </label>
          <div className="relative focus-within:border-ruby-600">
            <input
              id={id}
              type="text"
              className="block w-full border-0 border-transparent bg-transparent pr-12 pb-6 focus:ring-0 sm:text-lg lg:text-2xl"
              placeholder="0.00"
              value={value === "0" ? "" : value}
              onChange={handleChange}
            />
            <div className="pointer-events-none absolute left-0 bottom-2 flex flex-col items-end pl-3">
              <span className="text-xs text-night-500">
                ~{" "}
                {formatUsdLong(
                  token.priceMagic *
                    magicUsd *
                    (!parsedValue || Number.isNaN(parsedValue)
                      ? 1
                      : parsedValue)
                )}
              </span>
            </div>
            <div className="absolute bottom-2 right-0 flex flex-col items-end pr-3">
              <div className="relative mb-1 flex items-center space-x-1">
                <p className="font-bold text-night-300 sm:text-sm">
                  {token.symbol}
                </p>
                {!locked && (
                  <>
                    <ChevronDownIcon className="h-4 w-4" />
                    <button
                      className="absolute inset-0 h-full w-full"
                      onClick={onTokenClick}
                    />
                  </>
                )}
              </div>
              <span
                className="cursor-pointer text-xs text-night-500"
                onClick={() =>
                  onChange(formatBigNumberInput(balance, token.decimals))
                }
              >
                Balance: {formatBigNumberDisplay(balance, token.decimals)}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-4 rounded-lg p-4 2xl:p-6">
          <div className="flex items-center justify-between">
            <a
              className="flex items-center gap-2"
              href={`${blockExplorer}/token/${token.id}`}
              title={`${token.symbol} (${token.id})`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TokenLogo token={token} className="h-5 w-5 rounded-full" />
              <span className="truncate text-xs font-bold sm:text-base">
                {token.symbol}{" "}
                {token.symbol.toLowerCase() !== token.name.toLowerCase() && (
                  <>({token.name})</>
                )}
              </span>
              <ExternalLinkIcon className="h-3 w-3" />
            </a>
            <div className="flex flex-col items-end sm:flex-row sm:items-baseline">
              <p className="whitespace-nowrap text-xs font-normal text-night-300 sm:text-lg">
                {formatUsdLong(token.priceMagic * magicUsd)} USD
              </p>
              {/* <p
                className={twMerge(
                  "flex items-baseline text-[0.5rem] font-semibold sm:ml-1 sm:text-xs",
                  {
                    "text-ruby-900": !positive,
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
                    className="h-3 w-3 flex-shrink-0 self-center text-ruby-500 sm:h-4 sm:w-4"
                    aria-hidden="true"
                  />
                )}
                <span className="sr-only">
                  {positive ? "Increased by" : "Decreased by"}
                </span>
                {formatPercent(price24hChange)}
              </p> */}
            </div>
          </div>
          {/* {showPriceGraph ? (
            <>
              <div className="h-24 2xl:h-36">
                <TimeIntervalLineGraph
                  gradient={{
                    from: positive ? "#96e4df" : "#ee9617",
                    to: positive ? "#21d190" : "#fe5858",
                  }}
                  data={token.price1wUsdIntervals}
                />
              </div>
              <p className="text-xs font-light text-night-500">
                VOL {formatUsd(token.volume1wMagic)}
              </p>
            </>
          ) : null} */}
        </div>
      </div>
    </div>
  );
}
