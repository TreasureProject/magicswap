import { useRef } from "react";
import { utils } from "ethers";
import { useSettings } from "~/context/settingsContext";
import { useUser } from "~/context/userContext";

import type { Optional, Pair } from "~/types";

import { useV2RouterWrite } from "./useV2RouterWrite";

export const useAddLiquidity = () => {
  const { accountData } = useUser();
  const { slippage, deadline } = useSettings();
  const statusRef = useRef<Optional<string>>(undefined);

  const { write: writeAddLiquidity } = useV2RouterWrite(
    "addLiquidity",
    statusRef.current
  );
  const { write: writeAddLiquidityEth } = useV2RouterWrite(
    "addLiquidityETH",
    statusRef.current
  );

  return (pair: Pair, rawToken0Amount: number, rawToken1Amount: number) => {
    const slippageMultiplier = (100 - slippage) / 100;
    const isToken1Eth = pair.token1.isEth;

    const token0Amount = utils.parseUnits(
      rawToken0Amount.toFixed(pair.token0.decimals)
    );
    const token1Amount = utils.parseUnits(
      rawToken1Amount.toFixed(pair.token1.decimals)
    );
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

    statusRef.current = `Add ${pair.name} Liquidity`;

    if (pair.hasEth) {
      writeAddLiquidityEth({
        overrides: {
          value: isToken1Eth ? token1Amount : token0Amount,
        },
        args: [
          isToken1Eth ? pair.token0.id : pair.token1.id,
          isToken1Eth ? token0Amount : token1Amount,
          isToken1Eth ? token0AmountMin : token1AmountMin,
          isToken1Eth ? token1AmountMin : token0AmountMin,
          accountData?.address,
          transactionDeadline,
        ],
      });
    } else {
      writeAddLiquidity({
        args: [
          pair.token0.id,
          pair.token1.id,
          token0Amount,
          token1Amount,
          token0AmountMin,
          token1AmountMin,
          accountData?.address,
          transactionDeadline,
        ],
      });
    }
  };
};
