import type {
  GetSwapPairQuery,
  GetSwapPairsQuery,
} from "~/graphql/exchange.generated";
import type { AdvancedToken, Optional, Pair, Token } from "~/types";
import { exchangeSdk } from "./api";

type RawToken = GetSwapPairsQuery["pairs"][0]["token0"];
type RawPairToken = GetSwapPairQuery["pairs"][0]["token0"];

const SUPPORTED_TOKENS = [
  {
    symbol: "MAGIC",
    name: "MAGIC",
    image: "/img/tokens/magic.png",
  },
  {
    symbol: "ELM",
    name: "Ellerium",
    image: "/img/tokens/ell.png",
  },
];

const normalizeSymbol = (symbol: string) => symbol.replace("$", "");

export const normalizeToken = ({
  id,
  symbol: rawSymbol,
  name,
  decimals,
  derivedETH,
}: RawToken): Token => {
  const symbol = normalizeSymbol(rawSymbol);
  return {
    id,
    symbol,
    isEth: symbol === "ETH" || symbol === "WETH",
    isMagic: symbol === "MAGIC",
    name,
    decimals: parseInt(decimals),
    priceMagic: parseFloat(derivedETH),
  };
};

export const normalizeAdvancedToken = (
  { hourData, dayData, ...rawToken }: RawPairToken,
  ethUsd: number
): AdvancedToken => {
  const token = normalizeToken(rawToken);
  return {
    ...token,
    priceUsd: token.priceMagic * ethUsd,
    price1dUsdIntervals: hourData.map(({ date, priceUSD }) => ({
      date,
      value: parseFloat(priceUSD),
    })),
    price1wUsdIntervals: dayData.map(({ date, priceUSD }) => ({
      date,
      value: parseFloat(priceUSD),
    })),
    volume1dUsd: hourData.reduce(
      (total, { volumeUSD }) => total + parseFloat(volumeUSD),
      0
    ),
    volume1wUsd: dayData.reduce(
      (total, { volumeUSD }) => total + parseFloat(volumeUSD),
      0
    ),
  };
};

export const getUniqueTokens = (pairs: Pair[]) => {
  const tokenSymbols: string[] = [];
  const tokens: Token[] = [];

  pairs.forEach(({ token0, token1 }) => {
    if (token0.isMagic || token1.isMagic) {
      const supportedToken0 = SUPPORTED_TOKENS.find(
        ({ symbol }) => symbol === token0.symbol
      );
      const supportedToken1 = SUPPORTED_TOKENS.find(
        ({ symbol }) => symbol === token1.symbol
      );
      if (supportedToken0 && supportedToken1) {
        if (!tokenSymbols.includes(token0.symbol)) {
          tokenSymbols.push(token0.symbol);
          tokens.push({
            ...token0,
            image: supportedToken0.image,
          });
        }

        if (!tokenSymbols.includes(token1.symbol)) {
          tokenSymbols.push(token1.symbol);
          tokens.push({
            ...token1,
            image: supportedToken1.image,
          });
        }
      }
    }
  });

  return tokens;
};

export const getTokenBySymbol = (
  tokens: Token[],
  symbol: string
): Optional<Token> =>
  tokens.find(
    (token) =>
      token.symbol.toLowerCase() === normalizeSymbol(symbol).toLowerCase()
  );

export const getEthUsd = async (url: string): Promise<number> => {
  const sdk = exchangeSdk(url);
  const { bundle } = await sdk.getEthPrice();
  return parseFloat(bundle?.ethPrice ?? 0);
};
