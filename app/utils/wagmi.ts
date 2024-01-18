import { bloctoWallet } from "@blocto/rainbowkit-connector";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { arbitrum, arbitrumSepolia } from "viem/chains";
import { configureChains, createConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;
const appName = "Magicswap";

const { chains, publicClient } = configureChains(
  [
    arbitrum,
    ...(import.meta.env.VITE_ENABLE_TESTNETS === "true"
      ? [arbitrumSepolia]
      : []),
  ],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_KEY }),
    publicProvider(),
  ],
);

const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains, projectId }),
      walletConnectWallet({ chains, projectId }),
      rabbyWallet({ chains }),
      bloctoWallet({ chains }),
      rainbowWallet({ chains, projectId }),
      coinbaseWallet({ appName, chains }),
      braveWallet({ chains }),
      trustWallet({
        projectId,
        chains,
      }),
      ledgerWallet({
        projectId,
        chains,
      }),
    ],
  },
  {
    groupName: "Multisig",
    wallets: [safeWallet({ chains })],
  },
]);

export const createWagmiConfig = () => {
  return {
    chains,
    config: createConfig({
      autoConnect: true,
      connectors,
      publicClient,
    }),
  };
};
