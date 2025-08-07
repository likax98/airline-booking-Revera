"use client";

import { Control } from "react-hook-form";

import {
  BookingFormValuesType,
  DATE_FIELDS_CONFIG,
} from "@/components/home/AirlineForm/lib";
import { ControlledField } from "@/components/shared/ControlledField";

import { DateSelectButton } from "./DateSelectButton";

interface Props {
  control: Control<BookingFormValuesType>;
}

export const FlightDateFields = ({ control }: Props): JSX.Element => (
  <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-12">
    {DATE_FIELDS_CONFIG.map(({ name, label }) => (
      <ControlledField
        key={name}
        render={({ field, error }) => (
          <DateSelectButton
            hasError={error}
            {...{ label, value: field.value }}
          />
        )}
        {...{ name, control }}
      />
    ))}
  </div>
);
