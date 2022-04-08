import type { LinksFunction, MetaFunction } from "@remix-run/node";
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

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

const TreasureLogoIcon = ({ className }: { className: string }) => (
  <svg
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 1486.2 1573.3"
    fill="#E3003D"
    className={className}
  >
    <g id="Treasure_x5F_Logomark_x5F_On_x5F_Light_00000042697129003240641870000006852363279536445082_">
      <path
        className="st0"
        d="M743.1,105.3c0,47-21.8,92.4-55.4,125.9s-78.9,55.4-125.9,55.4c94,0,181.3,87.3,181.3,181.3
		c0-94,87.3-181.3,181.3-181.3C830.4,286.6,743.1,199.3,743.1,105.3z"
      />
      <path
        className="st0"
        d="M17.7,739.3c0-0.2,0-0.4,0-0.7c0-1.2,0-2.4,0-3.6V739.3z"
      />
      <path
        className="st0"
        d="M366,242.8c0.1,0,0.2,0,0.4,0c166.6-17.4,288.1-91.8,340.5-223.3c1.2-3,2.3-6,3.4-9
		C511,19.3,332.6,108.6,206.8,246.7h60.3C293.7,246.7,339.6,245.4,366,242.8"
      />
      <path
        className="st0"
        d="M1119.8,242.7c0.1,0,0.2,0,0.4,0c26.5,2.7,72.3,4,98.9,3.9h60.3C1153.6,108.6,975.2,19.3,775.8,10.4
		c1.1,3,2.3,6,3.4,9C831.7,150.9,953.3,225.4,1119.8,242.7"
      />
      <path
        className="st0"
        d="M1339.7,633.5h-32.5c5.9,33,9,66.9,9,101.6c0,227.7-132.7,424.3-325,516.8v152c0,4.3,0.4,8.5,1.3,12.6
		c277.8-101.7,476-368.4,476-681.4c0-13.8-0.4-27.5-1.2-41.2C1436,655.7,1389.2,633.5,1339.7,633.5"
      />
      <path
        className="st0"
        d="M1359.2,553.8c43.9,0,85.8,17.5,116.6,48.2c-18.7-100.7-58.1-194-113.8-275.4h-142.9c-26,0-72.5,1.3-98.9,3.9
		c-0.1,0-0.2,0-0.4,0c-166.6,17.4-288.1,91.8-340.5,223.3c-24.1,60.4-36.2,132.9-36.2,217.3h0c0-84.5-12-156.9-36.2-217.3
		c-52.4-131.5-174-205.9-340.5-223.3c-0.1,0-0.2,0-0.4,0c-26.5-2.7-72.9-3.9-98.9-3.9H124.2C68.6,408,29.1,501.3,10.4,602
		c30.8-30.7,72.6-48.2,116.6-48.2h448.1v850.1c0,50-25.8,94.7-65.6,120.5c21.4,7.3,43.3,13.6,65.6,18.9
		c53.9,12.8,110.2,19.6,168,19.6c57.8,0,114.1-6.8,168-19.6c22.3-5.3,44.2-11.6,65.6-18.9c-39.9-25.8-65.6-70.5-65.6-120.5V553.8
		H1359.2z"
      />
      <path
        className="st0"
        d="M170,735.1c0-34.7,3.1-68.6,9-101.6h-32.5c-49.5,0-96.3,22.2-127.6,60.5c-0.8,13.6-1.2,27.3-1.2,41.2
		c0,313,198.2,579.7,476,681.4c0.8-4.1,1.3-8.3,1.3-12.6v-152C302.7,1159.4,170,962.8,170,735.1"
      />
    </g>
  </svg>
);

const SplitIcon = ({ className }: { className: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 4L20 10L17.71 7.71L12.41 13L4 13L4 11L11.59 11L16.29 6.29L14 4L20 4ZM17.71 16.29L20 14L20 20L14 20L16.29 17.71L13.41 14.83L14.83 13.41L17.71 16.29Z"
    />
  </svg>
);

const PieIcon = ({ className }: { className: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM13 13L13 19.93C16.61 19.48 19.48 16.61 19.93 13L13 13ZM12 4C16.07 4 19.44 7.06 19.93 11L4.07 11C4.56 7.06 7.93 4 12 4ZM11 13L4.07 13C4.52 16.61 7.39 19.48 11 19.93L11 13Z"
    />
  </svg>
);

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
        className="absolute right-full transform translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full"
        width={404}
        height={784}
        fill="none"
        viewBox="0 0 404 784"
      >
        <defs>
          <pattern
            id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
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
          fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)"
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
      <body className="bg-gray-900 text-white">
        <div className="flex items-center justify-center h-16 px-8 z-10 border-b border-gray-800">
          <TreasureLogoIcon className="w-8 h-8" />
        </div>
        <div className="overflow-hidden relative">
          <DotPattern />
          <div className="flex flex-col min-h-[calc(100vh-64px)] max-w-5xl m-auto p-8">
            <Outlet />
          </div>
          <header className="px-2 fixed left-0 right-0 bottom-[5.5rem] sm:bottom-36 z-10">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-2xl backdrop-blur-md bg-gray-800 bg-opacity-80 rounded-xl shadow-xl z-10 p-2">
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
