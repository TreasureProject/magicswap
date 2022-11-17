import type { BigNumber } from "ethers";
import { useRef } from "react";
import { useSettings } from "~/context/settingsContext";
import { useUser } from "~/context/userContext";

import type { Optional, Token } from "~/types";
import { formatBigNumber } from "~/utils/number";
import { calculateWorstAmountIn, calculateWorstAmountOut } from "~/utils/swap";

import { useV2RouterWrite } from "./useV2RouterWrite";

export const useSwap = () => {
  const { address } = useUser();
  const { slippage, deadline } = useSettings();
  const statusRef = useRef<Optional<string>>(undefined);

  const {
    write: writeSwapEthForExactTokens,
    isError: isError1,
    isSuccess: isSuccess1,
    isLoading: isLoading1,
  } = useV2RouterWrite("swapETHForExactTokens", statusRef.current);
  const {
    write: writeSwapExactEthForTokens,
    isError: isError2,
    isSuccess: isSuccess2,
    isLoading: isLoading2,
  } = useV2RouterWrite("swapExactETHForTokens", statusRef.current);
  const {
    write: writeSwapExactTokensForEth,
    isError: isError3,
    isSuccess: isSuccess3,
    isLoading: isLoading3,
  } = useV2RouterWrite("swapExactTokensForETH", statusRef.current);
  const {
    write: writeSwapTokensForExactEth,
    isError: isError4,
    isSuccess: isSuccess4,
    isLoading: isLoading4,
  } = useV2RouterWrite("swapTokensForExactETH", statusRef.current);
  const {
    write: writeSwapExactTokensForTokens,
    isError: isError5,
    isSuccess: isSuccess5,
    isLoading: isLoading5,
  } = useV2RouterWrite("swapExactTokensForTokens", statusRef.current);
  const {
    write: writeSwapTokensForExactTokens,
    isError: isError6,
    isSuccess: isSuccess6,
    isLoading: isLoading6,
  } = useV2RouterWrite("swapTokensForExactTokens", statusRef.current);

  const swap = (
    inputToken: Token,
    outputToken: Token,
    rawAmountIn: BigNumber,
    rawAmountOut: BigNumber,
    isExactOut = false
  ) => {
    const isOutputEth = outputToken.isEth;
    const isEth = inputToken.isEth || isOutputEth;

    const amountIn = isExactOut
      ? calculateWorstAmountIn(rawAmountIn, slippage)
      : rawAmountIn;
    const amountOut = isExactOut
      ? rawAmountOut
      : calculateWorstAmountOut(rawAmountOut, slippage);
    const path = [inputToken.id, outputToken.id];

    const transactionDeadline = (
      Math.ceil(Date.now() / 1000) +
      60 * deadline
    ).toString();

    statusRef.current = `Swap ${formatBigNumber(amountIn)} ${
      inputToken.symbol
    } to ${formatBigNumber(amountOut)} ${outputToken.symbol}`;

    if (isExactOut) {
      if (isEth) {
        if (isOutputEth) {
          writeSwapTokensForExactEth?.(
            {
              recklesslySetUnpreparedArgs: [
                amountOut, // amountOut
                amountIn, // amountInMax
                path,
                address,
                transactionDeadline,
              ],
            }
            // statusHeader
          );
        } else {
          writeSwapEthForExactTokens?.(
            {
              recklesslySetUnpreparedOverrides: {
                value: amountIn,
              },
              recklesslySetUnpreparedArgs: [
                amountOut, // amountOut
                path,
                address,
                transactionDeadline,
              ],
            }
            // statusHeader
          );
        }
      } else {
        writeSwapTokensForExactTokens?.(
          {
            recklesslySetUnpreparedArgs: [
              amountOut, // amountOut
              amountIn, // amountInMax
              path,
              address,
              transactionDeadline,
            ],
          }
          // statusHeader
        );
      }
    } else {
      if (isEth) {
        if (isOutputEth) {
          writeSwapExactTokensForEth?.(
            {
              recklesslySetUnpreparedArgs: [
                amountIn, // amountIn
                amountOut, // amountOutMin
                path,
                address,
                transactionDeadline,
              ],
            }
            // statusHeader
          );
        } else {
          writeSwapExactEthForTokens?.(
            {
              recklesslySetUnpreparedOverrides: {
                value: amountIn,
              },
              recklesslySetUnpreparedArgs: [
                amountOut, // amountOutMin
                path,
                address,
                transactionDeadline,
              ],
            }
            // statusHeader
          );
        }
      } else {
        writeSwapExactTokensForTokens?.(
          {
            recklesslySetUnpreparedArgs: [
              amountIn, // amountIn
              amountOut, // amountOutMin
              path,
              address,
              transactionDeadline,
            ],
          }
          // statusHeader
        );
      }
    }
  };

  return {
    swap,
    isLoading:
      isLoading1 ||
      isLoading2 ||
      isLoading3 ||
      isLoading4 ||
      isLoading5 ||
      isLoading6,
    isError:
      isError1 || isError2 || isError3 || isError4 || isError5 || isError6,
    isSuccess:
      isSuccess1 ||
      isSuccess2 ||
      isSuccess3 ||
      isSuccess4 ||
      isSuccess5 ||
      isSuccess6,
  };
};
