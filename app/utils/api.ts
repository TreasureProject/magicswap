import { GraphQLClient } from "graphql-request";

import { getSdk as getExchangeSdk } from "~/graphql/exchange.generated";
import { getSdk as getSushiswapExchangeSdk } from "~/graphql/sushiswap.generated";

export const exchangeSdk = (url: string) =>
  getExchangeSdk(new GraphQLClient(url, { fetch }));

export const sushiswapExchangeSdk = (url: string) =>
  getSushiswapExchangeSdk(new GraphQLClient(url, { fetch }));
