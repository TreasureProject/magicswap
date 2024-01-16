import { ClientOnly } from "remix-utils/client-only";

import type { SwapRoute } from "~/hooks/useSwapRoute";
import { formatAmount, formatPercent } from "~/utils/number";

type Props = SwapRoute & {
  hideDerivedValue?: boolean;
};

export const SwapRoutePanel = ({
  amountIn,
  amountOut,
  tokenIn,
  tokenOut,
  priceImpact,
  derivedValue,
  lpFee,
  gameFundFee,
  ecoFundFee,
  hideDerivedValue = false,
}: Props) => (
  <div className="divide-y divide-night-700/50 rounded-lg border border-night-700/50 text-sm text-night-400">
    {!hideDerivedValue ? (
      <div className="p-4">
        <span className="font-medium text-honey-25">1</span> {tokenOut?.symbol}{" "}
        ={" "}
        <span className="font-medium text-honey-25">
          <ClientOnly>{() => formatAmount(derivedValue)}</ClientOnly>
        </span>{" "}
        {tokenIn?.symbol}
      </div>
    ) : null}
    {amountIn > 0 && amountOut > 0 ? (
      <ul className="space-y-1 p-4">
        <li className="flex items-center justify-between gap-4">
          Price impact
          <span
            className={
              priceImpact >= 0.05
                ? "text-red-500"
                : priceImpact > 0.035
                  ? "text-amber-500"
                  : "text-honey-25"
            }
          >
            -{formatPercent(priceImpact)}
          </span>
        </li>
        {lpFee > 0 && (
          <li className="flex items-center justify-between gap-4">
            Liquidity provider fee
            <span>{formatPercent(lpFee)}</span>
          </li>
        )}
        {gameFundFee > 0 && (
          <li className="flex items-center justify-between gap-4">
            Community Gamification Fund fee
            <span>{formatPercent(gameFundFee)}</span>
          </li>
        )}
        {ecoFundFee > 0 && (
          <li className="flex items-center justify-between gap-4">
            Community Ecosystem Fund fee
            <span>{formatPercent(ecoFundFee)}</span>
          </li>
        )}
      </ul>
    ) : null}
  </div>
);
