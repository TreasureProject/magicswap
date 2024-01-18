import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import {
  ConnectButton,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  NavLink as Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetchers,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import NProgress from "nprogress";
import { Fragment, useEffect, useMemo } from "react";
import { Toaster, resolveValue } from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { WagmiConfig } from "wagmi";

import {
  DiscordIcon,
  GitHubIcon,
  PieIcon,
  SpinnerIcon,
  SplitIcon,
  TwitterIcon,
} from "./components/Icons";
import { PairsProvider } from "./context/pairs";
import { PriceProvider } from "./context/priceContext";
import { SettingsProvider } from "./context/settingsContext";
import { UserProvider } from "./context/userContext";
import "./styles/font.css";
import "./styles/nprogress.css";
import "./styles/tailwind.css";
import { createMetaTags } from "./utils/meta";
import { getPairs } from "./utils/pair.server";
import { createWagmiConfig } from "./utils/wagmi";

export const links: LinksFunction = () => [
  {
    rel: "icon",
    type: "image/png",
    sizes: "180x180",
    href: "/img/apple-touch-icon.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/img/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/img/favicon-16x16.png",
  },
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "mask-icon", href: "/img/safari-pinned-tab.svg", color: "#DC2626" },
  { rel: "shortcut icon", href: "/img/favicon.ico" },
];

export const meta: MetaFunction = () => [
  ...createMetaTags("Swap | Magicswap"),
  {
    name: "apple-mobile-web-app-title",
    content: "Magicswap",
  },
  {
    name: "application-name",
    content: "Magicswap",
  },
  {
    name: "msapplication-TileColor",
    content: "#DC2626",
  },
  {
    name: "msapplication-config",
    content: "/browserconfig.xml",
  },
  {
    name: "theme-color",
    content: "#DC2626",
  },
];

export const loader = async () => {
  const pairs = await getPairs();
  return { pairs };
};

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
          className={twMerge(
            "flex flex-1 items-center justify-center space-x-6 rounded-lg px-4 py-3 text-base font-medium tracking-wide 2xl:px-8 2xl:py-4 2xl:text-base",
            isActive
              ? "bg-night-900 text-white"
              : "text-night-500 hover:bg-night-700/10 hover:text-night-500",
          )}
        >
          <Icon className={twMerge("h-6 w-6", isActive && "fill-ruby-500")} />
          <span>{children}</span>
        </div>
      )}
    </Link>
  );
};

const { chains, config: wagmiConfig } = createWagmiConfig();

export default function App() {
  const navigation = useNavigation();
  const fetchers = useFetchers();
  const { pairs } = useLoaderData<typeof loader>();

  const state = useMemo<"idle" | "loading">(
    function getGlobalState() {
      const states = [
        navigation.state,
        ...fetchers.map((fetcher) => fetcher.state),
      ];
      if (states.every((state) => state === "idle")) return "idle";
      return "loading";
    },
    [navigation.state, fetchers],
  );

  // slim loading bars on top of the page, for page transitions
  useEffect(() => {
    if (state === "loading") NProgress.start();
    if (state === "idle") NProgress.done();
  }, [state, navigation.state]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-night-900 text-white antialiased">
        <div className="border-2 border-t border-ruby-900" />
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            appInfo={{
              appName: "Magicswap",
            }}
            chains={chains}
            theme={darkTheme({
              fontStack: "system",
              accentColor: "#DC2626",
              borderRadius: "large",
            })}
          >
            <UserProvider>
              <PriceProvider>
                <SettingsProvider>
                  <PairsProvider pairs={pairs}>
                    <div className="z-10 flex items-center justify-center px-8">
                      <div className="mx-auto flex w-full flex-row items-center gap-2 py-4 xl:max-w-6xl 2xl:max-w-7xl">
                        <div className="mr-auto hidden flex-1 items-center divide-x divide-night-800 sm:flex">
                          <a
                            className="px-3 text-night-500 transition-colors hover:text-white"
                            href="https://twitter.com/Magicswap_"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Twitter"
                          >
                            <TwitterIcon className="h-5 w-5" />
                          </a>
                          <a
                            className="px-3 text-night-500 transition-colors hover:text-white"
                            href="http://discord.gg/treasuredao"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Discord"
                          >
                            <DiscordIcon className="h-6 w-6" />
                          </a>
                          <a
                            className="px-3 text-night-500 transition-colors hover:text-white"
                            href="https://github.com/TreasureProject/magicswap"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="GitHub"
                          >
                            <GitHubIcon className="h-6 w-6" />
                          </a>
                        </div>
                        <div className="flex flex-1 items-center justify-start sm:justify-center">
                          <Link to="/">
                            <img
                              src="/img/logo-magicswap.svg"
                              className="h-8"
                              alt="Magicswap"
                            />
                          </Link>
                        </div>
                        <div className="ml-auto flex flex-1 items-center justify-end">
                          <ConnectButton
                            accountStatus="address"
                            showBalance={{
                              smallScreen: false,
                              largeScreen: false,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="relative overflow-hidden">
                      <div className="relative m-auto mb-24 flex min-h-[calc(100vh-64px)] flex-col p-8 pt-0 sm:pt-8 xl:max-w-6xl 2xl:max-w-7xl">
                        <Outlet />
                      </div>
                      <header className="fixed bottom-[4.5rem] left-0 right-0 z-10 px-2 sm:bottom-24">
                        <div className="relative">
                          <div className="absolute left-1/2 z-10 w-full max-w-lg -translate-x-1/2 transform rounded-xl bg-night-800/40 p-2 shadow-2xl shadow-night-800/30 backdrop-blur-md 2xl:max-w-2xl">
                            <nav className="flex gap-1">
                              <NavLink to="/">Swap</NavLink>
                              <NavLink to="pools">Pool</NavLink>
                            </nav>
                          </div>
                        </div>
                      </header>
                    </div>
                  </PairsProvider>
                </SettingsProvider>
              </PriceProvider>
            </UserProvider>
          </RainbowKitProvider>
          <Toaster position="bottom-left" reverseOrder={false} gutter={18}>
            {(t) => (
              <Transition
                show={t.visible}
                as={Fragment}
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-night-800 shadow-lg ring-1 ring-black ring-opacity-5">
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
                                <ExclamationCircleIcon className="h-6 w-6 text-ruby-500" />
                              );
                            case "loading":
                              return (
                                <SpinnerIcon className="h-6 w-6 animate-spin fill-night-800 text-yellow-500" />
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
        </WagmiConfig>
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
        <script
          src="https://efficient-bloc-party.treasure.lol/script.js"
          data-site="XBZCEUKN"
          defer
        />
      </body>
    </html>
  );
}
