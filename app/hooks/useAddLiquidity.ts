import { utils } from "ethers";
import { useAccount, useContractWrite } from "wagmi";

import { Pair } from "~/types";

import UniswapV2Router02Abi from "../../artifacts/UniswapV2Router02.json";

export const useAddLiquidity = () => {
  const { data: accountData } = useAccount();
  const { write: writeAddLiquidity } = useContractWrite(
    {
      addressOrName: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
      contractInterface: UniswapV2Router02Abi,
    },
    "addLiquidity"
  );

  const { write: writeAddLiquidityEth } = useContractWrite(
    {
      addressOrName: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
      contractInterface: UniswapV2Router02Abi,
    },
    "addLiquidityETH"
  );

  return (
    pair: Pair,
    rawToken0Amount: number,
    rawToken1Amount: number,
    slippage = 0.5
  ) => {
    const slippageMultiplier = (100 - slippage) / 100;
    const isToken1Eth = pair.token1.symbol === "WETH";
    const isEth = pair.token0.symbol === "WETH" || isToken1Eth;

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
    const deadline = (Math.ceil(Date.now() / 1000) + 60 * 30).toString(); // 30 minutes from now;

    if (isEth) {
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
          deadline,
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
          deadline,
        ],
      });
    }
  };
};
