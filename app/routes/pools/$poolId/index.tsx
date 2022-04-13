// This is a redirect route

import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = ({ params }) => {
  invariant(params.poolId, `params.poolId is required`);

  return redirect(`/pools/${params.poolId}/manage`);
};
