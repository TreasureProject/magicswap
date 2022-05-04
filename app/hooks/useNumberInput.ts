import { useCallback, useEffect, useState } from "react";
import { formatNumber } from "~/utils/number";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export const useNumberInput = ({ value, onChange }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const parsedValue = Number.isNaN(parseFloat(inputValue))
    ? 0
    : parseFloat(inputValue);

  useEffect(() => {
    setInputValue(value ? formatNumber(value).replace(/,/g, "") : "");
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let periodMatches = 0;
      let nextInputValue = e.target.value
        .replace(/,/g, ".") // Replace commas with periods
        .replace(/[^0-9.]/g, "") // Replace all non-numeric and non-period characters
        .replace(/\./g, (match) => (++periodMatches > 1 ? "" : match)); // Replace all periods after the first one

      let numberValue = parseFloat(nextInputValue);
      if (Number.isNaN(numberValue)) {
        numberValue = 0;
        nextInputValue = "";
      }

      setInputValue(nextInputValue);
      onChange(numberValue);
    },
    [onChange]
  );

  return {
    inputValue,
    parsedValue,
    handleChange,
  };
};
