export const getFormatOptions = (
  value: number,
  isUsd = false
): Intl.NumberFormatOptions => {
  const formatOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: isUsd ? 2 : 0,
    maximumFractionDigits: isUsd ? 2 : 5,
  };

  if (value > 1e6) {
    formatOptions.minimumFractionDigits = 0;
    formatOptions.maximumFractionDigits = 0;
  } else if (value > 1) {
    formatOptions.maximumFractionDigits = 2;
  }

  return formatOptions;
};

export const formatNumber = (value: number) =>
  value.toLocaleString("en-US", getFormatOptions(value));

export const formatPercent = (value: number) =>
  `${(value * 100).toFixed(2).replace(".00", "")}%`;
