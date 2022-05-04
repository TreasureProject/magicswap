import React from "react";
import { NumberField } from "~/components/NumberField";
import { SLIPPAGE_OPTIONS, useSettings } from "~/context/settingsContext";
import { formatPercent } from "~/utils/number";

export const AdvancedSettingsPopoverContent = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { slippage, deadline, updateSlippage, updateDeadline } = useSettings();
  return (
    <>
      <h3 className="font-medium text-white">Advanced Settings</h3>
      <div className="mt-2 flex flex-col">
        <div className="flex flex-col">
          <p className="text-sm text-gray-200">Slippage Tolerance</p>
          {slippage >= 0.06 ? (
            <p className="text-[0.6rem] text-yellow-500">
              Your transaction may be frontrun
            </p>
          ) : null}
          <div className="mt-2 flex space-x-2">
            {SLIPPAGE_OPTIONS.map((option) => (
              <button
                key={option}
                className="rounded-md bg-gray-800/50 py-2 px-3.5 text-[0.6rem] font-medium text-white ring-offset-gray-800 hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-1 sm:text-xs"
                onClick={() => updateSlippage(option)}
              >
                {formatPercent(option)}
              </button>
            ))}
          </div>
          <div className="mt-2">
            <NumberField
              label="Slippage Tolerance"
              value={slippage}
              onChange={(value) => updateSlippage(value)}
              minValue={0.001}
              maxValue={0.49}
              placeholder="0.5%"
              formatOptions={{
                style: "percent",
                minimumFractionDigits: 1,
                maximumFractionDigits: 2,
              }}
              errorMessage="Slippage must be between 0.1% and 49%"
              errorCondition={(value) => value > 49}
              autoFocus
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <p className="text-sm text-gray-200">Transaction Deadline</p>
          <div className="mt-2">
            <NumberField
              label="Transaction Deadline"
              value={deadline}
              onChange={(value) => updateDeadline(value)}
              minValue={1}
              maxValue={60}
              placeholder="20"
              errorMessage="Deadline must be between 1 and 60"
              errorCondition={(value) => value > 60}
            >
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-sm text-gray-400">Minutes</span>
              </div>
            </NumberField>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};
