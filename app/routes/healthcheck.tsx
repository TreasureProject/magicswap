import { getPairs } from "~/utils/pair.server";

export const loader = async () => {
  try {
    await getPairs();
    return new Response("OK");
  } catch (err) {
    console.error("Healthcheck failed:", err);
    return new Response("ERROR", { status: 500 });
  }
};
