import { useLocale } from "@react-aria/i18n";
import { useNumberField } from "@react-aria/numberfield";
import { useNumberFieldState } from "@react-stately/numberfield";
import React from "react";
import { twMerge } from "tailwind-merge";

export const NumberField = ({
  children,
  errorCondition,
  ...props
}: Parameters<typeof useNumberField>[0] & {
  errorCondition: (value: number) => boolean;
  children?: React.ReactNode;
}) => {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { labelProps, inputProps } = useNumberField(props, state, inputRef);

  const sanitizedValue = parseFloat(state.inputValue.replace(/[^0-9.]/g, ""));

  return (
    <>
      <div className="flex-1">
        <label className="sr-only" {...labelProps}>
          {props.label}
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            {...inputProps}
            ref={inputRef}
            className={twMerge(
              sanitizedValue > 49
                ? "focus:border-ruby-500 focus:ring-ruby-500"
                : "focus:border-night-500 focus:ring-night-500",
              "block w-full rounded-md bg-night-800/60 text-sm focus:border-night-500",
            )}
            placeholder={props.placeholder}
          />
          {children}
        </div>
      </div>
      {props.errorMessage && errorCondition(sanitizedValue) ? (
        <p className="mt-2 text-sm text-ruby-600">
          {props.errorMessage.toString()}
        </p>
      ) : null}
    </>
  );
};
