// testing purposes only
const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const TOKENS = [
  {
    name: "Magic",
    symbol: "MAGIC",
    address: "0x0000000000000000000000000000000000000001",
  },
  {
    name: "Etherium",
    symbol: "ETH",
    address: "0x0000000000000000000000000000000000000002",
  },
  {
    name: "Token 3",
    symbol: "TKN3",
    address: "0x0000000000000000000000000000000000000003",
  },
  {
    name: "Token 4",
    symbol: "TKN4",
    address: "0x0000000000000000000000000000000000000004",
  },
];

export type Tokens = typeof TOKENS;

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
