import { chainId } from "wagmi";

export enum AppContract {
  Router,
  MagicElmPair,
  MagicGflyPair,
}

export const CONTRACT_ADDRESSES: Record<number, Record<AppContract, string>> = {
  [chainId.arbitrum]: {
    [AppContract.Router]: "0x23805449f91bb2d2054d9ba288fdc8f09b5eac79",
    [AppContract.MagicElmPair]: "0xf904469497e6a179a9d47a7b468e4be42ec56e65",
    [AppContract.MagicGflyPair]: "",
  },
  [chainId.arbitrumGoerli]: {
    [AppContract.Router]: "0xe6ef3dac2ba5b785a36c2200da2c087735c3b426",
    [AppContract.MagicElmPair]: "0x82b79579f07a3539f10d0b2c35316b0e8333b2cc",
    [AppContract.MagicGflyPair]: "0x32c4151748d6efe734bedb9931dd1e050586b605",
  },
};

export const SUPPORTED_CONTRACT_ADDRESSES = Object.entries(
  CONTRACT_ADDRESSES
).flatMap(([, contracts]) => Object.values(contracts));
