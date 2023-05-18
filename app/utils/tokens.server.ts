import type {
  GetSwapPairQuery,
  GetSwapPairsQuery,
} from "~/graphql/exchange.generated";
import type { AdvancedToken, Optional, Pair, Token } from "~/types";

type RawToken = GetSwapPairsQuery["pairs"][0]["token0"];
type RawPairToken = GetSwapPairQuery["pairs"][0]["token0"];

const TOKEN_LIST = [
  {
    symbol: "MAGIC",
    name: "MAGIC",
    image: "/img/tokens/magic.png",
  },
  {
    symbol: "ELM",
    name: "Ellerium",
    image: "/img/tokens/elm.png",
  },
  {
    symbol: "GFLY",
    name: "gFly",
    image: "/img/tokens/gfly.png",
  },
  {
    symbol: "VEE",
    name: "VEE",
    image: "/img/tokens/vee.png",
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
    image: TOKEN_LIST.find((token) => token.symbol === symbol)?.image,
    decimals: parseInt(decimals),
    priceMagic: parseFloat(derivedETH),
  };
};

export const normalizeAdvancedToken = ({
  hourData,
  dayData,
  ...rawToken
}: RawPairToken): AdvancedToken => {
  const token = normalizeToken(rawToken);
  return {
    ...token,
    price1dUsdIntervals: hourData.map(({ date, priceUSD }) => ({
      date,
      value: parseFloat(priceUSD),
    })),
    price1wUsdIntervals: dayData.map(({ date, priceUSD }) => ({
      date,
      value: parseFloat(priceUSD),
    })),
    volume1dMagic: hourData.reduce(
      (total, { volumeETH }) => total + parseFloat(volumeETH),
      0
    ),
    volume1wMagic: dayData.reduce(
      (total, { volumeETH }) => total + parseFloat(volumeETH),
      0
    ),
  };
};

export const getUniqueTokens = (pairs: Pair[]) => {
  const tokenSymbols: string[] = [];
  const tokens: Token[] = [];

  pairs.forEach(({ token0, token1 }) => {
    if (!tokenSymbols.includes(token0.symbol)) {
      tokenSymbols.push(token0.symbol);
      tokens.push(token0);
    }

    if (!tokenSymbols.includes(token1.symbol)) {
      tokenSymbols.push(token1.symbol);
      tokens.push(token1);
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
