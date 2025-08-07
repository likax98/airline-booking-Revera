"use client";

import type { Control } from "react-hook-form";

import { Option } from "@/components/home/AirlineForm/components";
import { ControlledField } from "@/components/shared/ControlledField";
import type { BookingFormValuesType } from "@/components/home/AirlineForm/lib";

type Props = {
  control: Control<BookingFormValuesType>;
};

export const FlightTypeOptionField = ({ control }: Props): JSX.Element => (
  <div className="flex flex-col mt-16 mb-11 sm:flex-row">
    <ControlledField<BookingFormValuesType, "flightTypeOption">
      name="flightTypeOption"
      renderErrorMessages={false}
      render={({ field }) => <Option {...field} />}
      {...{ control }}
    />
  </div>
);
