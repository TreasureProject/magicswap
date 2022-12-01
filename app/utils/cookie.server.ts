import { createCookie } from "@remix-run/node";

type UserPrefsCookie = Partial<{
  input: string;
  output: string;
}>;

const userPrefs = createCookie("user-prefs", { httpOnly: true, secure: true });

export async function getCookie(request: Request): Promise<UserPrefsCookie> {
  const header = request.headers.get("Cookie");
  const cookie = await userPrefs.parse(header);

  return cookie ?? {};
}

export async function saveCookie(cookie: UserPrefsCookie) {
  return {
    headers: {
      "Set-Cookie": await userPrefs.serialize(cookie),
    },
  };
}
