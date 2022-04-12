import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink as Link,
} from "@remix-run/react";
import cn from "clsx";

import styles from "./styles/tailwind.css";
import React from "react";
import { PieIcon, SplitIcon, TreasureLogoIcon } from "./components/Icons";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

const NavLink = ({
  to,
  children,
}: {
  to: "/" | "pools";
  children: React.ReactNode;
}) => {
  const Icon = to === "/" ? SplitIcon : PieIcon;

  return (
    <Link to={to} className="flex-1">
      {({ isActive }) => (
        <div
          className={cn(
            "flex-1 flex justify-center items-center space-x-6 px-8 py-4 rounded-lg text-xl",
            {
              "bg-gray-800 text-white": isActive,
              "text-gray-500 hover:text-gray-500 hover:bg-gray-800": !isActive,
            }
          )}
        >
          <Icon
            className={cn("w-6 h-6", {
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
        className="absolute right-full transform top-0 translate-x-1/4 sm:translate-x-1/2 lg:translate-x-full"
        width="472"
        height="503"
        viewBox="0 0 472 503"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M345.705 125.696L471.401 0H345.705L220.009 125.696L345.705 251.391L220.009 377.017L345.705 502.712H471.401L345.705 377.017L471.401 251.391L345.705 125.696Z"
          fill="currentColor"
          className="text-[#1B1C22]"
        />
        <path
          d="M234.321 251.391L108.625 125.696L234.321 0H108.625L-17 125.696L108.625 251.391L-17 377.017L108.625 502.712H234.321L108.625 377.017L234.321 251.391Z"
          fill="currentColor"
          className="text-[#1B1C22]"
        />
      </svg>
      <svg
        className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
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
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-[#191A21] text-white antialiased">
        <div className="flex items-center justify-center h-16 px-8 z-10 border-b border-gray-800 relative">
          <TreasureLogoIcon className="w-8 h-8" />
        </div>
        <div className="overflow-hidden relative">
          <DotPattern />
          <div className="flex flex-col min-h-[calc(100vh-64px)] max-w-7xl m-auto p-8 relative mb-24">
            <Outlet />
          </div>
          <header className="px-2 fixed left-0 right-0 bottom-[5.5rem] sm:bottom-28 z-10">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-2xl backdrop-blur-md bg-gray-800 bg-opacity-80 rounded-xl z-10 p-2 shadow-xl shadow-gray-800/30">
                <nav className="flex gap-1">
                  <NavLink to="/">Swap</NavLink>
                  <NavLink to="pools">Pool</NavLink>
                </nav>
              </div>
            </div>
          </header>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
