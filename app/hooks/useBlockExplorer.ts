import { useNetwork } from "wagmi";

export const useBlockExplorer = () => {
  const { chain } = useNetwork();
  return chain?.blockExplorers?.default.url ?? "https://arbiscan.io";
};
