import { useNetwork } from "wagmi";

export const useBlockExplorer = () => {
  const { chain } = useNetwork();
  return (
    chain?.blockExplorers?.default ?? {
      name: "Arbiscan",
      url: "https://arbiscan.io",
    }
  );
};
