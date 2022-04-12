import { getSdk } from "~/graphql/generated";
import { GraphQLClient } from "graphql-request";

//@ts-ignore
const sdk = getSdk(
  new GraphQLClient(
    "https://api.thegraph.com/subgraphs/name/sushiswap/arbitrum-exchange",
    {
      fetch: fetch,
    }
  )
);

export { sdk };
