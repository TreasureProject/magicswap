import { useCallback, useEffect, useState } from "react";

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
    setInputValue(value ? value.toString() : "");
  }, [value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const normalizedValue = e.target.value.replace(/,/g, ".");
    setInputValue(normalizedValue);
  }, []);

  const handleBlur = useCallback(() => {
    if (parsedValue !== value) {
      onChange(parsedValue);
    }
  }, [parsedValue, value, onChange]);

  return {
    inputValue,
    parsedValue,
    handleBlur,
    handleChange,
  };
};
