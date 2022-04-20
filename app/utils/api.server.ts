import { GraphQLClient } from "graphql-request";

import { getSdk as getBlocksSdk } from "~/graphql/blocks.generated";
import { getSdk as getExchangeSdk } from "~/graphql/exchange.generated";

export const blocksSdk = getBlocksSdk(
  new GraphQLClient(
    "https://api.thegraph.com/subgraphs/name/sushiswap/arbitrum-blocks",
    { fetch }
  )
);

export const exchangeSdk = getExchangeSdk(
  new GraphQLClient(
    "https://api.thegraph.com/subgraphs/name/sushiswap/arbitrum-exchange",
    { fetch }
  )
);
