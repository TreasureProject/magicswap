import { GraphQLClient } from "graphql-request";

import { getSdk as getExchangeSdk } from "~/graphql/exchange.generated";

export const exchangeSdk = (url: string) =>
  getExchangeSdk(new GraphQLClient(url, { fetch }));
