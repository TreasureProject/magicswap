import type { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { useRef } from "react";
import { useSettings } from "~/context/settingsContext";
import { useUser } from "~/context/userContext";

import type { Optional, Pair } from "~/types";
import { calculateWorstAmountOut } from "~/utils/swap";

import { useV2RouterWrite } from "./useV2RouterWrite";

export const useRemoveLiquidity = () => {
  const { address } = useUser();
  const { slippage, deadline } = useSettings();
  const statusRef = useRef<Optional<string>>(undefined);

  const {
    write: writeRemoveLiquidity,
    isLoading,
    isSuccess,
    isError,
  } = useV2RouterWrite("removeLiquidity", statusRef.current);
  const {
    write: writeRemoveLiquidityEth,
    isLoading: isLoading1,
    isSuccess: isSuccess1,
    isError: isError1,
  } = useV2RouterWrite("removeLiquidityETH", statusRef.current);

  const removeLiquidity = (
    pair: Pair,
    rawLpAmount: number,
    rawToken0Amount: number,
    rawToken1Amount: number
  ) => {
    const slippageMultiplier = (100 - slippage) / 100;
    const isToken1Eth = pair.token1.isEth;

    const lpAmount = parseUnits(rawLpAmount.toFixed(18));
    const token0AmountMin = parseUnits(
      (rawToken0Amount * slippageMultiplier).toFixed(pair.token0.decimals)
    );
    const token1AmountMin = parseUnits(
      (rawToken1Amount * slippageMultiplier).toFixed(pair.token1.decimals)
    );
    const transactionDeadline = (
      Math.ceil(Date.now() / 1000) +
      60 * deadline
    ).toString();

    statusRef.current = `Remove ${pair.name} Liquidity`;

    if (pair.hasEth) {
      writeRemoveLiquidityEth?.({
        recklesslySetUnpreparedArgs: [
          isToken1Eth ? pair.token0.id : pair.token1.id,
          lpAmount,
          isToken1Eth ? token0AmountMin : token1AmountMin,
          isToken1Eth ? token1AmountMin : token0AmountMin,
          address,
          transactionDeadline,
        ],
      });
    } else {
      writeRemoveLiquidity?.({
        recklesslySetUnpreparedArgs: [
          pair.token0.id,
          pair.token1.id,
          lpAmount,
          token0AmountMin,
          token1AmountMin,
          address,
          transactionDeadline,
        ],
      });
    }
  };

  return {
    removeLiquidity,
    isLoading: isLoading || isLoading1,
    isSuccess: isSuccess || isSuccess1,
    isError: isError || isError1,
  };
};

export const useAddLiquidity = () => {
  const { address } = useUser();
  const { slippage, deadline } = useSettings();
  const statusRef = useRef<Optional<string>>(undefined);

  const {
    write: writeAddLiquidity,
    isLoading,
    isSuccess,
    isError,
  } = useV2RouterWrite("addLiquidity", statusRef.current);
  const {
    write: writeAddLiquidityEth,
    isLoading: isLoading1,
    isSuccess: isSuccess1,
    isError: isError1,
  } = useV2RouterWrite("addLiquidityETH", statusRef.current);

  const addLiquidity = (
    pair: Pair,
    token0Amount: BigNumber,
    token1Amount: BigNumber
  ) => {
    const isToken1Eth = pair.token1.isEth;
    const token0AmountMin = calculateWorstAmountOut(token0Amount, slippage);
    const token1AmountMin = calculateWorstAmountOut(token1Amount, slippage);
    const transactionDeadline = (
      Math.ceil(Date.now() / 1000) +
      60 * deadline
    ).toString();

    statusRef.current = `Add ${pair.name} Liquidity`;

    if (pair.hasEth) {
      writeAddLiquidityEth?.({
        recklesslySetUnpreparedOverrides: {
          value: isToken1Eth ? token1Amount : token0Amount,
        },
        recklesslySetUnpreparedArgs: [
          isToken1Eth ? pair.token0.id : pair.token1.id,
          isToken1Eth ? token0Amount : token1Amount,
          isToken1Eth ? token0AmountMin : token1AmountMin,
          isToken1Eth ? token1AmountMin : token0AmountMin,
          address,
          transactionDeadline,
        ],
      });
    } else {
      writeAddLiquidity?.({
        recklesslySetUnpreparedArgs: [
          pair.token0.id,
          pair.token1.id,
          token0Amount,
          token1Amount,
          token0AmountMin,
          token1AmountMin,
          address,
          transactionDeadline,
        ],
      });
    }
  };

  return {
    addLiquidity,
    isLoading: isLoading || isLoading1,
    isSuccess: isSuccess || isSuccess1,
    isError: isError || isError1,
  };
};
