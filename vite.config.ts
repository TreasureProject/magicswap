import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  return defineConfig({
    ssr: {
      noExternal: ["decimal.js-light"],
    },
    plugins: [
      remix({
        ignoredRouteFiles: ["**/.*"],
      }),
      tsconfigPaths(),
    ],
  });
};
