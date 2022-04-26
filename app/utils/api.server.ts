import { GraphQLClient } from "graphql-request";

import { getSdk as getExchangeSdk } from "~/graphql/exchange.generated";

export const exchangeSdk = getExchangeSdk(
  new GraphQLClient(
    "https://api.thegraph.com/subgraphs/name/sushiswap/arbitrum-exchange",
    { fetch }
  )
);
