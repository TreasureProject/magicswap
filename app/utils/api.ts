import { GraphQLClient } from "graphql-request";

import { getSdk as getExchangeSdk } from "~/graphql/exchange.generated";

export const exchangeSdk = getExchangeSdk(
  new GraphQLClient(process.env.MAGICSWAP_API_URL ?? "", { fetch }),
);
