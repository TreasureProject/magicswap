import type { BigNumber, CallOverrides } from "ethers";
import { useMemo, useRef } from "react";
import { useSettings } from "~/context/settingsContext";
import { useUser } from "~/context/userContext";

import type { Optional, Token } from "~/types";
import { formatBigNumber } from "~/utils/number";
import { calculateWorstAmountIn, calculateWorstAmountOut } from "~/utils/swap";

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
    ? calculateWorstAmountIn(rawAmountIn, slippage)
    : rawAmountIn;
  const amountOut = isExactOut
    ? rawAmountOut
    : calculateWorstAmountOut(rawAmountOut, slippage);

  const transactionDeadline = (
    Math.ceil(Date.now() / 1000) +
    60 * deadline
  ).toString();

  statusRef.current = `Swap ${formatBigNumber(amountIn)} ${
    inputToken.symbol
  } to ${formatBigNumber(amountOut)} ${outputToken.symbol}`;

  const [functionName, args, overrides] = useMemo<
    [RouterFunctionName, any, CallOverrides?]
  >(() => {
    if (isExactOut) {
      if (isEth) {
        if (isOutputEth) {
          return [
            "swapTokensForExactETH",
            [
              amountOut, // amountOut
              amountIn, // amountInMax
              path,
              address,
              transactionDeadline,
            ],
          ];
        }

        return [
          "swapETHForExactTokens",
          [
            amountOut, // amountOut
            path,
            address,
            transactionDeadline,
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
          path,
          address,
          transactionDeadline,
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
            path,
            address,
            transactionDeadline,
          ],
        ];
      }

      return [
        "swapExactETHForTokens",
        [
          amountOut, // amountOutMin
          path,
          address,
          transactionDeadline,
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
        path,
        address,
        transactionDeadline,
      ],
    ];
  }, [
    isExactOut,
    isEth,
    isOutputEth,
    amountIn,
    amountOut,
    path,
    address,
    transactionDeadline,
  ]);

  const { write, isError, isSuccess, isLoading } = useV2RouterWrite(
    functionName,
    statusRef.current
  );

  return {
    swap: () =>
      write?.({
        recklesslySetUnpreparedOverrides: overrides,
        recklesslySetUnpreparedArgs: args,
      }),
    isLoading,
    isError,
    isSuccess,
  };
};
