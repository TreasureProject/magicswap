import { Zero } from "@ethersproject/constants";
import type { BigNumber } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { toBigNumber } from "~/utils/number";

type Props = {
  value: BigNumber;
  onChange: (value: BigNumber) => void;
};

export const useBigNumberInput = ({ value, onChange }: Props) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(value ? value.toString().replace(/,/g, "") : "");
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let periodMatches = 0;
      const nextValue = e.target.value
        .replace(/,/g, ".") // Replace commas with periods
        .replace(/[^0-9.]/g, "") // Replace all non-numeric and non-period characters
        .replace(/\./g, (match) => (++periodMatches > 1 ? "" : match)); // Replace all periods after the first one
      setInputValue(nextValue);
      onChange(nextValue ? toBigNumber(nextValue) : Zero);
    },
    [onChange]
  );

  return {
    inputValue,
    handleChange,
  };
};
