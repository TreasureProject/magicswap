export const getFormatOptions = (
  value: number,
  isUsd = false
): Intl.NumberFormatOptions => {
  const formatOptions: Intl.NumberFormatOptions = {};

  if (isUsd) {
    formatOptions.minimumFractionDigits = 2;
    formatOptions.maximumFractionDigits = 2;
  } else {
    formatOptions.maximumSignificantDigits = value < 1 ? 8 : 6;
  }

  return formatOptions;
};

export const formatNumber = (value: number) =>
  value.toLocaleString("en-US", getFormatOptions(value));

export const formatPercent = (value: number, minimumFractionDigits = 2) =>
  `${(value * 100).toLocaleString("en-US", {
    minimumFractionDigits,
    maximumFractionDigits: 3,
  })}%`;
