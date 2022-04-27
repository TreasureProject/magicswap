import { createClient } from "wagmi";
import { chain } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { providers } from "ethers";
import { Buffer } from "buffer";

if (typeof window !== "undefined" && !window.Buffer) {
  window.Buffer = Buffer;
}

const chains = [chain.arbitrum, chain.arbitrumRinkeby];

const isChainSupported = (chainId?: number) =>
  chains.some(({ id }) => id === chainId);

export const generateClient = ({ ALCHEMY_KEY }: { ALCHEMY_KEY: string }) =>
  createClient({
    autoConnect: true,
    connectors() {
      return [
        new InjectedConnector({ chains }),
        new WalletConnectConnector({
          chains,
          options: {
            rpc: {
              [chain.arbitrum
                .id]: `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
              [chain.arbitrumRinkeby.id]:
                "https://arb-rinkeby.g.alchemy.com/v2/ktPJku9xHYB37bA3I2jk79FwRLWGBrj2",
            },
            qrcode: true,
          },
        }),
      ];
    },
    provider({ chainId }) {
      return new providers.AlchemyProvider(
        isChainSupported(chainId) ? chainId : chain.arbitrum.id,
        ALCHEMY_KEY
      );
    },
  });
