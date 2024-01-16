import { zeroAddress } from "viem";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";

export const CONTRACT_ADDRESSES = {
  [arbitrumSepolia.id]: {
    Router: "0xf9e197aa9fa7c3b27a1a1313cad5851b55f2fd71",
    MagicElmPair: "0x576588f313f2ec342bff4aaed1df46c2fc05e148",
    MagicGflyPair: zeroAddress,
    MagicVeePair: zeroAddress,
    MagicAnimaPair: zeroAddress,
    MagicSmolPair: "0xeba6af266b49faa76dc26eea589c7d227a597206",
  },
  [arbitrum.id]: {
    Router: "0x23805449f91bb2d2054d9ba288fdc8f09b5eac79",
    MagicElmPair: "0x3e8fb78ec6fb60575967bb07ac64e5fa9f498a4a",
    MagicGflyPair: "0x088f2bd3667f385427d9289c28725d43d4b74ab4",
    MagicVeePair: "0x6210775833732f144058713c9b36de09afd1ca3b",
    MagicAnimaPair: "0x7bc27907ac638dbceb74b1fb02fc154da3e15334",
    MagicSmolPair: "0x33f4668f5a9a36514d85657e699569dbda3d77f1",
  },
} as const;

export const SUPPORTED_CONTRACT_ADDRESSES = Object.entries(
  CONTRACT_ADDRESSES,
).flatMap(([, contracts]) => Object.values(contracts));

export const REFETCH_INTERVAL_HIGH_PRIORITY = 2_500;
