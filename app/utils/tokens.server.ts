import { chain } from "wagmi";
import { Token } from "~/types";

// testing purposes only
const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const TOKENS: Token[] = [
  {
    name: "Magic",
    symbol: "MAGIC",
    addresses: {
      [chain.arbitrum.id]: "0x539bde0d7dbd336b79148aa742883198bbf60342",
      [chain.arbitrumRinkeby.id]: "0x7b402a341f92d2ce96da3f87d00b60d552d66ca7",
    },
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    addresses: {
      [chain.arbitrum.id]: "0x0000000000000000000000000000000000000002",
      [chain.arbitrumRinkeby.id]: "0x0000000000000000000000000000000000000002",
    },
  },
  {
    name: "Token 3",
    symbol: "TKN3",
    addresses: {
      [chain.arbitrum.id]: "0x0000000000000000000000000000000000000003",
      [chain.arbitrumRinkeby.id]: "0x0000000000000000000000000000000000000003",
    },
  },
  {
    name: "Token 4",
    symbol: "TKN4",
    addresses: {
      [chain.arbitrum.id]: "0x0000000000000000000000000000000000000004",
      [chain.arbitrumRinkeby.id]: "0x0000000000000000000000000000000000000004",
    },
  },
];

export const getTokens = async (filter?: string) => {
  await wait(100);

  if (filter) {
    return TOKENS.filter((token) => token.symbol.includes(filter));
  }

  return TOKENS;
};

export const getTokenBySymbol = async (symbol: string) => {
  await wait(100);

  return TOKENS.find((token) => token.symbol === symbol);
};
