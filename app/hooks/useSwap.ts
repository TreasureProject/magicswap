import type { BigNumber } from "@ethersproject/bignumber";
import { useMemo, useRef } from "react";
import { useSettings } from "~/context/settingsContext";
import { useUser } from "~/context/userContext";

import type { Optional, Token } from "~/types";
import { formatBigNumberDisplay } from "~/utils/number";
import { calculateAmountInMin, calculateAmountOutMin } from "~/utils/swap";

import type { RouterFunctionName } from "./useV2RouterWrite";
import { useV2RouterWrite } from "./useV2RouterWrite";

type Props = {
  inputToken: Token;
  outputToken: Token;
  amountIn: BigNumber;
  amountOut: BigNumber;
  isExactOut?: boolean;
};

export const useSwap = ({
  inputToken,
  outputToken,
  amountIn: rawAmountIn,
  amountOut: rawAmountOut,
  isExactOut,
}: Props) => {
  const { address } = useUser();
  const { slippage, deadline } = useSettings();
  const statusRef = useRef<Optional<string>>(undefined);

  const path = useMemo(
    () => [inputToken.id, outputToken.id],
    [inputToken.id, outputToken.id]
  );
  const isOutputEth = outputToken.isEth;
  const isEth = inputToken.isEth || isOutputEth;

  const amountIn = isExactOut
    ? calculateAmountInMin(rawAmountIn, slippage)
    : rawAmountIn;
  const amountOut = isExactOut
    ? rawAmountOut
    : calculateAmountOutMin(rawAmountOut, slippage);

  const [functionName, args, overrides] = useMemo<
    [RouterFunctionName, any, any?]
  >(() => {
    if (isExactOut) {
      if (isEth) {
        if (isOutputEth) {
          return [
            "swapTokensForExactETH",
            [
              amountOut, // amountOut
              amountIn, // amountInMax
            ],
          ];
        }

        return [
          "swapETHForExactTokens",
          [
            amountOut, // amountOut
          ],
          {
            value: amountIn,
          },
        ];
      }

      return [
        "swapTokensForExactTokens",
        [
          amountOut, // amountOut
          amountIn, // amountInMax
        ],
      ];
    }

    if (isEth) {
      if (isOutputEth) {
        return [
          "swapExactTokensForETH",
          [
            amountIn, // amountIn
            amountOut, // amountOutMin
          ],
        ];
      }

      return [
        "swapExactETHForTokens",
        [
          amountOut, // amountOutMin
        ],
        {
          value: amountIn,
        },
      ];
    }

    return [
      "swapExactTokensForTokens",
      [
        amountIn, // amountIn
        amountOut, // amountOutMin
      ],
    ];
  }, [isExactOut, isEth, isOutputEth, amountIn, amountOut]);

  const { write, isError, isSuccess, isLoading } = useV2RouterWrite(
    functionName,
    statusRef.current
  );

  return {
    amountIn,
    amountOut,
    slippage,
    swap: () => {
      statusRef.current = `Swap ${formatBigNumberDisplay(
        amountIn,
        inputToken.decimals
      )} ${inputToken.symbol} to ${formatBigNumberDisplay(
        amountOut,
        outputToken.decimals
      )} ${outputToken.symbol}`;
      write?.({
        recklesslySetUnpreparedOverrides: overrides,
        recklesslySetUnpreparedArgs: [
          ...args,
          path,
          address,
          Math.ceil(Date.now() / 1000) + 60 * deadline,
        ],
      });
    },
    isLoading,
    isError,
    isSuccess,
  };
};
