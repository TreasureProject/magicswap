import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { getTokens } from "~/utils/tokens.server";

export type LoaderData = {
  tokenList: Awaited<ReturnType<typeof getTokens>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchToken = url.searchParams.get("searchToken") ?? undefined;

  return json<LoaderData>({
    tokenList: await getTokens(searchToken),
  });
};
