import type {
  GetSwapPairQuery,
  GetSwapPairsQuery,
} from "~/graphql/exchange.generated";
import type { AdvancedToken, Optional, Token, TokenImageList } from "~/types";
import { exchangeSdk } from "./api.server";

type RawTokenList = GetSwapPairsQuery["pairs"];
type RawToken = RawTokenList[0]["token0"];
type RawPairToken = GetSwapPairQuery["pairs"][0]["token0"];

const normalizeSymbol = (symbol: string) => symbol.replace("$", "");

export const normalizeToken = ({
  id,
  symbol,
  name,
  decimals,
  derivedETH,
}: RawToken): Token => ({
  id,
  symbol: normalizeSymbol(symbol),
  name,
  decimals: parseInt(decimals),
  priceEth: parseFloat(derivedETH),
});

export const normalizeAdvancedToken = (
  { hourData, dayData, ...rawToken }: RawPairToken,
  ethUsd: number
): AdvancedToken => {
  const token = normalizeToken(rawToken);
  const priceUsd = token.priceEth * ethUsd;

  let price24hChange = -1;
  if (dayData.length > 1) {
    const priceYesterdayUsd = parseFloat(dayData[1].priceUSD);
    price24hChange = parseFloat(
      ((priceUsd - priceYesterdayUsd) / priceYesterdayUsd).toFixed(2)
    );
  }

  return {
    ...token,
    priceUsd,
    price24hChange,
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

const normalizeTokenList = (pairs: RawTokenList): Token[] => {
  const tokenSymbols: string[] = [];
  const tokens: Token[] = [];

  pairs.forEach(({ token0, token1 }) => {
    const normalizedToken0 = normalizeToken(token0);
    if (!tokenSymbols.includes(normalizedToken0.symbol)) {
      tokenSymbols.push(normalizedToken0.symbol);
      tokens.push(normalizedToken0);
    }

    const normalizedToken1 = normalizeToken(token1);
    if (!tokenSymbols.includes(normalizedToken1.symbol)) {
      tokenSymbols.push(normalizedToken1.symbol);
      tokens.push(normalizedToken1);
    }
  });

  return tokens;
};

export const getTokens = async (filter?: string): Promise<Token[]> => {
  const { pairs } = await exchangeSdk.getSwapPairs({
    where: {
      reserveETH_gt: 0,
    },
  });

  const tokens = normalizeTokenList(pairs);

  if (filter) {
    return tokens.filter((token) => token.symbol.includes(filter));
  }

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

export const getEthUsd = async (): Promise<number> => {
  const { bundle } = await exchangeSdk.getEthPrice();
  return parseFloat(bundle?.ethPrice ?? 0);
};

export const getTokensImageAddress = async () => {
  try {
    const json: TokenImageList = await (
      await fetch("https://bridge.arbitrum.io/token-list-42161.json")
    ).json();

    const { tokens } = json;

    return tokens;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};
