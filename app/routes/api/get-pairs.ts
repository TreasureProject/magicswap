import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import type { Pair, Token } from "~/types";
import { getEnvVariable } from "~/utils/env";
import { getPairs } from "~/utils/pair.server";
import { getUniqueTokens } from "~/utils/tokens.server";

export type LoaderData = {
  pairs: Pair[];
  tokens: Token[];
};

export const loader: LoaderFunction = async ({ context }) => {
  const pairs = await getPairs(getEnvVariable("EXCHANGE_ENDPOINT", context));
  return json<LoaderData>({
    pairs,
    tokens: getUniqueTokens(pairs),
  });
};
