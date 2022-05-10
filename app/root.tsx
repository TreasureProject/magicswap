import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import type { ShouldReloadFunction } from "@remix-run/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  NavLink as Link,
  useTransition,
  useFetchers,
  useLoaderData,
} from "@remix-run/react";
import cn from "clsx";
import { resolveValue, Toaster } from "react-hot-toast";
import { chain, createClient, WagmiProvider } from "wagmi";
import rainbowStyles from "@rainbow-me/rainbowkit/styles.css";
import {
  apiProvider,
  configureChains,
  connectorsForWallets,
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
  wallet,
} from "@rainbow-me/rainbowkit";

import styles from "./styles/tailwind.css";
import React from "react";
import {
  PieIcon,
  SpinnerIcon,
  SplitIcon,
  TreasureLogoIcon,
} from "./components/Icons";

import NProgress from "nprogress";
import nProgressStyles from "./styles/nprogress.css";
import { Wallet } from "./components/Wallet";
import { getEnvVariable } from "./utils/env";

import { getTokensImageAddress } from "./utils/tokens.server";
import type { CloudFlareEnv, CloudFlareEnvVar } from "./types";
import { UserProvider } from "./context/userContext";
import { PriceProvider } from "./context/priceContext";
import { SettingsProvider } from "./context/settingsContext";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";

export type RootLoaderData = {
  tokenImageList: Awaited<ReturnType<typeof getTokensImageAddress>>;
  ENV: Partial<CloudFlareEnv>;
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: nProgressStyles },
  { rel: "stylesheet", href: rainbowStyles },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Swap | Magicswap",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ context }) => {
  const env = context as CloudFlareEnv;
  return json<RootLoaderData>({
    tokenImageList: await getTokensImageAddress(),
    ENV: Object.keys(env).reduce(
      (envVars, key) => ({
        ...envVars,
        [key]: getEnvVariable(key as CloudFlareEnvVar, context),
      }),
      {}
    ),
  });
};

export const unstable_shouldReload: ShouldReloadFunction = () => false;

const NavLink = ({
  to,
  children,
}: {
  to: "/" | "pools";
  children: React.ReactNode;
}) => {
  const Icon = to === "/" ? SplitIcon : PieIcon;

  return (
    <Link to={to} className="flex-1" prefetch="render">
      {({ isActive }) => (
        <div
          className={cn(
            "flex flex-1 items-center justify-center space-x-6 rounded-lg px-4 py-3 text-base font-medium tracking-wide 2xl:px-8 2xl:py-4 2xl:text-base",
            {
              "bg-gray-900 text-white": isActive,
              "text-gray-500 hover:bg-gray-700/10 hover:text-gray-500":
                !isActive,
            }
          )}
        >
          <Icon
            className={cn("h-6 w-6", {
              "fill-red-500": isActive,
            })}
          />
          <span>{children}</span>
        </div>
      )}
    </Link>
  );
};

const DotPattern = () => (
  <div className="absolute inset-y-0 h-full w-full" aria-hidden="true">
    <div className="relative h-full">
      <svg
        className="absolute right-full top-0 translate-x-1/4 transform sm:translate-x-1/2 lg:translate-x-full"
        width="472"
        height="503"
        viewBox="0 0 472 503"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M345.705 125.696L471.401 0H345.705L220.009 125.696L345.705 251.391L220.009 377.017L345.705 502.712H471.401L345.705 377.017L471.401 251.391L345.705 125.696Z"
          fill="currentColor"
          className="text-[#1B1C22] opacity-50 blur-sm brightness-75 -hue-rotate-60 saturate-50 sepia"
        />
        <path
          d="M234.321 251.391L108.625 125.696L234.321 0H108.625L-17 125.696L108.625 251.391L-17 377.017L108.625 502.712H234.321L108.625 377.017L234.321 251.391Z"
          fill="currentColor"
          className="text-[#1B1C22] opacity-50 blur-sm brightness-75 -hue-rotate-60 saturate-50 sepia"
        />
      </svg>
      <svg
        className="absolute left-full -translate-y-3/4 -translate-x-1/4 transform sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
        width={404}
        height={784}
        fill="none"
        viewBox="0 0 404 784"
      >
        <defs>
          <pattern
            id="d2a68204-c383-44b1-b99f-42ccff4e5365"
            x={0}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <rect
              x={0}
              y={0}
              width={4}
              height={4}
              className="text-gray-800"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width={404}
          height={784}
          fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"
        />
      </svg>
    </div>
  </div>
);

export default function App() {
  const transition = useTransition();
  const { ENV } = useLoaderData<RootLoaderData>();

  const { chains, provider } = React.useMemo(
    () =>
      configureChains(
        [
          ...(ENV.ENABLE_TESTNETS === "true" ? [chain.arbitrumRinkeby] : []),
          chain.arbitrum,
        ],
        [apiProvider.alchemy(ENV.ALCHEMY_KEY), apiProvider.fallback()]
      ),
    [ENV.ENABLE_TESTNETS, ENV.ALCHEMY_KEY]
  );

  const { wallets } = React.useMemo(
    () =>
      getDefaultWallets({
        appName: "Magicswap",
        chains,
      }),
    [chains]
  );

  const connectors = React.useMemo(
    () =>
      connectorsForWallets([
        ...wallets,
        {
          groupName: "Others",
          wallets: [wallet.trust({ chains }), wallet.ledger({ chains })],
        },
      ]),
    [chains, wallets]
  );

  const client = React.useMemo(
    () =>
      createClient({
        autoConnect: true,
        connectors,
        provider,
      }),
    [connectors, provider]
  );

  const fetchers = useFetchers();

  const state = React.useMemo<"idle" | "loading">(
    function getGlobalState() {
      const states = [
        transition.state,
        ...fetchers.map((fetcher) => fetcher.state),
      ];
      if (states.every((state) => state === "idle")) return "idle";
      return "loading";
    },
    [transition.state, fetchers]
  );

  // slim loading bars on top of the page, for page transitions
  React.useEffect(() => {
    if (state === "loading") NProgress.start();
    if (state === "idle") NProgress.done();
  }, [state, transition.state]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-[#191A21] text-white antialiased">
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center -space-x-8 lg:flex-row">
          <div className="h-48 w-48 rounded-full bg-[#670F0F] blur-[146px] sm:h-[30rem] sm:w-[30rem]" />
          <div className="h-48 w-48 rounded-full bg-[#4B0F67] blur-[146px] sm:h-[30rem] sm:w-[30rem]" />
        </div>
        <WagmiProvider client={client}>
          <RainbowKitProvider
            appInfo={{
              appName: "Magicswap",
            }}
            chains={chains}
            theme={darkTheme({
              fontStack: "system",
              accentColor: "#ef4444",
              borderRadius: "medium",
            })}
          >
            <UserProvider>
              <PriceProvider>
                <SettingsProvider>
                  <div className="z-10 flex h-16 items-center justify-center border-b border-gray-800 px-8">
                    <div className="relative m-auto flex max-w-3xl flex-1 items-center justify-between xl:max-w-6xl xl:justify-center 2xl:max-w-7xl">
                      <TreasureLogoIcon className="h-8 w-8" />
                      <div className="inset-y-0 right-5 flex items-center justify-center sm:absolute">
                        <Wallet />
                      </div>
                    </div>
                  </div>
                  <div className="relative overflow-hidden">
                    <DotPattern />
                    <div className="relative m-auto mb-24 flex min-h-[calc(100vh-64px)] max-w-3xl flex-col p-8 xl:max-w-6xl 2xl:max-w-7xl">
                      <Outlet />
                    </div>
                    <header className="fixed left-0 right-0 bottom-[4.5rem] z-10 px-2 sm:bottom-24">
                      <div className="relative">
                        <div className="absolute left-1/2 z-10 w-full max-w-lg -translate-x-1/2 transform rounded-xl bg-gray-900/40 p-2 shadow-2xl shadow-gray-800/30 backdrop-blur-md 2xl:max-w-2xl">
                          <nav className="flex gap-1">
                            <NavLink to="/">Swap</NavLink>
                            <NavLink to="pools">Pool</NavLink>
                          </nav>
                        </div>
                      </div>
                    </header>
                  </div>
                </SettingsProvider>
              </PriceProvider>
            </UserProvider>
          </RainbowKitProvider>
        </WagmiProvider>
        <Toaster position="bottom-left" reverseOrder={false} gutter={18}>
          {(t) => (
            <Transition
              show={t.visible}
              as={React.Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                  <div className="flex items-center justify-center">
                    <div className="flex-shrink-0">
                      {(() => {
                        switch (t.type) {
                          case "success":
                            return (
                              <CheckCircleIcon className="h-6 w-6 text-green-500" />
                            );
                          case "error":
                            return (
                              <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
                            );
                          case "loading":
                            return (
                              <SpinnerIcon className="h-6 w-6 animate-spin fill-gray-800 text-yellow-500" />
                            );
                          default:
                            return (
                              <CheckCircleIcon className="h-6 w-6 text-yellow-500" />
                            );
                        }
                      })()}
                    </div>
                    <div className="ml-3 w-0 flex-1">
                      <div className="text-sm text-white">
                        {resolveValue(t.message, t)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          )}
        </Toaster>
        <Scripts />
        {ENV.NODE_ENV === "development" ? <LiveReload /> : null}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(ENV)};`,
          }}
        />
      </body>
    </html>
  );
}
