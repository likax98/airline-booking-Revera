// context.ts

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { DateFieldLabelType } from "../lib";

export interface ContextValue {
  // Labels in our case are unique, so let's not introduce other types or props
  activeDateField?: DateFieldLabelType;
  setActiveDateField: Dispatch<
    SetStateAction<DateFieldLabelType | undefined>
  >;
}

const FlightDateFieldContext = createContext<ContextValue | undefined>(
  undefined
);

export const useFlightDateField = (): ContextValue => {
  const context = useContext(FlightDateFieldContext);

  if (!context) {
    throw new Error(
      "'useFlightDateField' must be used within a 'FlightDateFieldProvider'"
    );
  }

  return context;
};

export const FlightDateFieldProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [activeDateField, setActiveDateField] =
    useState<DateFieldLabelType>();
  const value = useMemo(
    () => ({ activeDateField, setActiveDateField }),
    [activeDateField]
  );

  return (
    <FlightDateFieldContext.Provider value={value}>
      {children}
    </FlightDateFieldContext.Provider>
  );
};

export { FlightDateFieldContext };
