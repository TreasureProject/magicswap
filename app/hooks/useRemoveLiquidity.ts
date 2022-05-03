import { utils } from "ethers";
import { useSettings } from "~/context/settingsContext";
import { useUser } from "~/context/userContext";

import type { Pair } from "~/types";

import { useV2RouterWrite } from "./useV2RouterWrite";

export const useRemoveLiquidity = () => {
  const { accountData } = useUser();
  const { slippage, deadline } = useSettings();
  const { write: writeRemoveLiquidity } = useV2RouterWrite("removeLiquidity");
  const { write: writeRemoveLiquidityEth } =
    useV2RouterWrite("removeLiquidityETH");

  return (
    pair: Pair,
    rawLpAmount: number,
    rawToken0Amount: number,
    rawToken1Amount: number
  ) => {
    const slippageMultiplier = (100 - slippage) / 100;
    const isToken1Eth = pair.token1.isEth;

    const lpAmount = utils.parseUnits(rawLpAmount.toFixed(18));
    const token0AmountMin = utils.parseUnits(
      (rawToken0Amount * slippageMultiplier).toFixed(pair.token0.decimals)
    );
    const token1AmountMin = utils.parseUnits(
      (rawToken1Amount * slippageMultiplier).toFixed(pair.token1.decimals)
    );
    const transactionDeadline = (
      Math.ceil(Date.now() / 1000) +
      60 * deadline
    ).toString();

    const statusHeader = `Remove ${pair.name} Liquidity`;

    if (pair.hasEth) {
      writeRemoveLiquidityEth(
        {
          args: [
            isToken1Eth ? pair.token0.id : pair.token1.id,
            lpAmount,
            isToken1Eth ? token0AmountMin : token1AmountMin,
            isToken1Eth ? token1AmountMin : token0AmountMin,
            accountData?.address,
            transactionDeadline,
          ],
        },
        statusHeader
      );
    } else {
      writeRemoveLiquidity(
        {
          args: [
            pair.token0.id,
            pair.token1.id,
            lpAmount,
            token0AmountMin,
            token1AmountMin,
            accountData?.address,
            transactionDeadline,
          ],
        },
        statusHeader
      );
    }
  };
};
