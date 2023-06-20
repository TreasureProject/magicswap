import { arbitrum, arbitrumGoerli } from "wagmi/chains";

import type { AddressString } from "./types";

export enum AppContract {
  Router,
  // MagicElmPair,
  MagicGflyPair,
  MagicVeePair,
  MagicAnimaPair,
}

export const CONTRACT_ADDRESSES: Record<
  number,
  Partial<Record<AppContract, AddressString>>
> = {
  [arbitrum.id]: {
    [AppContract.Router]: "0x23805449f91bb2d2054d9ba288fdc8f09b5eac79",
    // [AppContract.MagicElmPair]: "0xf904469497e6a179a9d47a7b468e4be42ec56e65",
    [AppContract.MagicGflyPair]: "0x088f2bd3667f385427d9289c28725d43d4b74ab4",
    [AppContract.MagicVeePair]: "0x6210775833732f144058713c9b36de09afd1ca3b",
    [AppContract.MagicAnimaPair]: "0x7bc27907ac638dbceb74b1fb02fc154da3e15334",
  },
  [arbitrumGoerli.id]: {
    [AppContract.Router]: "0xe6ef3dac2ba5b785a36c2200da2c087735c3b426",
    // [AppContract.MagicElmPair]: "0x82b79579f07a3539f10d0b2c35316b0e8333b2cc",
    [AppContract.MagicGflyPair]: "0x7e8ce14d9d541b3494e20fba97ddd010f29b0250",
    [AppContract.MagicVeePair]: "0xa5f4441c1dd3515767a4e33bacc320fb3828688f",
    [AppContract.MagicAnimaPair]: "0x7cfc374cfe753c9b77b6dac1d5d8c97ed84adc36",
  },
};

export const SUPPORTED_CONTRACT_ADDRESSES = Object.entries(
  CONTRACT_ADDRESSES
).flatMap(([, contracts]) => Object.values(contracts));

export const REFETCH_INTERVAL_HIGH_PRIORITY = 2_500;
