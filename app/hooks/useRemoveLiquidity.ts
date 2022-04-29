import { utils } from "ethers";
import { useAccount } from "wagmi";

import type { Pair } from "~/types";

import { useV2RouterWrite } from "./useV2RouterWrite";

export const useRemoveLiquidity = () => {
  const { data: accountData } = useAccount();
  const { write: writeRemoveLiquidity } = useV2RouterWrite("removeLiquidity");
  const { write: writeRemoveLiquidityEth } =
    useV2RouterWrite("removeLiquidityETH");

  return (
    pair: Pair,
    rawLpAmount: number,
    rawToken0Amount: number,
    rawToken1Amount: number,
    slippage = 0.5
  ) => {
    const slippageMultiplier = (100 - slippage) / 100;
    const isToken1Eth = pair.token1.symbol === "WETH";
    const isEth = pair.token0.symbol === "WETH" || isToken1Eth;

    const lpAmount = utils.parseUnits(rawLpAmount.toFixed(18));
    const token0AmountMin = utils.parseUnits(
      (rawToken0Amount * slippageMultiplier).toFixed(pair.token0.decimals)
    );
    const token1AmountMin = utils.parseUnits(
      (rawToken1Amount * slippageMultiplier).toFixed(pair.token1.decimals)
    );
    const deadline = (Math.ceil(Date.now() / 1000) + 60 * 30).toString(); // 30 minutes from now;

    const statusHeader = `Remove ${pair.name} Liquidity`;

    if (isEth) {
      writeRemoveLiquidityEth(
        {
          args: [
            isToken1Eth ? pair.token0.id : pair.token1.id,
            lpAmount,
            isToken1Eth ? token0AmountMin : token1AmountMin,
            isToken1Eth ? token1AmountMin : token0AmountMin,
            accountData?.address,
            deadline,
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
            deadline,
          ],
        },
        statusHeader
      );
    }
  };
};
