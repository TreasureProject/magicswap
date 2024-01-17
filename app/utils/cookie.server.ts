import { createCookie } from "@remix-run/node";

export enum MagicswapCookie {
  LastPair = "ms:lastPair",
}

type LastPairCookie = Partial<{
  input: string;
  output: string;
}>;

export const getCookie = async (request: Request, type: MagicswapCookie) => {
  const cookie = createCookie(type, { httpOnly: true, secure: true });
  return cookie.parse(request.headers.get("Cookie"));
};

export const saveCookie = async (
  type: MagicswapCookie,
  value: string | object
) => {
  const cookie = createCookie(type, { httpOnly: true, secure: true });
  return {
    headers: {
      "Set-Cookie": await cookie.serialize(value),
    },
  };
};

export const getLastPairCookie = async (
  request: Request
): Promise<LastPairCookie | null> =>
  getCookie(request, MagicswapCookie.LastPair);

export const saveLastPairCookie = async (value: LastPairCookie) =>
  saveCookie(MagicswapCookie.LastPair, value);
