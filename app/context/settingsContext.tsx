import type { ReactNode } from "react";
import { createContext, useContext, useReducer } from "react";

type State = {
  slippage: number;
  deadline: number;
};

enum ActionType {
  UpdateSlippage = "UPDATE_SLIPPAGE",
  UpdateDeadline = "UPDATE_DEADLINE",
}

type Action = {
  type: ActionType;
  value: number;
};

type ContextValue = State & {
  updateSlippage: (slippage: number) => void;
  updateDeadline: (deadline: number) => void;
};

const INITIAL_STATE = {
  slippage: 0.005,
  deadline: 20,
};

export const SLIPPAGE_OPTIONS = [0.001, 0.005, 0.01];

const Context = createContext(INITIAL_STATE as ContextValue);

export const useSettings = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "Must call `useSettings` within a `SettingsProvider` component.",
    );
  }

  return context;
};

const reducer = (state: State, { type, value }: Action): State => {
  switch (type) {
    case ActionType.UpdateSlippage:
      return {
        ...state,
        slippage: value,
      };
    case ActionType.UpdateDeadline:
      return {
        ...state,
        deadline: value,
      };
    default:
      throw new Error(`Unknown reducer action type ${type}`);
  }
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <Context.Provider
      value={{
        ...state,
        updateSlippage: (value: number) =>
          dispatch({ type: ActionType.UpdateSlippage, value }),
        updateDeadline: (value: number) =>
          dispatch({ type: ActionType.UpdateDeadline, value }),
      }}
    >
      {children}
    </Context.Provider>
  );
};
